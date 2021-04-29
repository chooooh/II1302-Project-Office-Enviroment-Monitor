/**
******************************************************************************
@brief functions for the environmental sensors, CCS811 & BME280.
@details bla bla bla
@file CCS811_BME280.c
@author  Sebastian Divander,       sdiv@kth.se
@author  Jonatan Lundqvist Silins, jonls@kth.se
@date 06-04-2021
@version 1.0
******************************************************************************
*/

#include "CCS811_BME280.h"


/* Compensation register values based on BME280 datasheet */
uint16_t dig_T1_val;
int16_t  dig_T2_val;
int16_t  dig_T3_val;
uint8_t  dig_H1_val;
int16_t  dig_H2_val;
uint8_t  dig_H3_val;
int16_t  dig_H4_val;
int16_t  dig_H5_val;
int8_t   dig_H6_val;


/**********************************************************************
 **********************************************************************
 ***																***
 ***					CCS811 FUNCTIONS							***
 ***																***
 **********************************************************************
 **********************************************************************/


SENSOR_STATUS
CCS811_init(void){

	uint8_t register_value = 0;
	SENSOR_STATUS status = CCS881_SUCCESS;

	/* Read the HW ID register to make sure the sensor is responsive */
	status = CCS811_read_register(HW_ID, &register_value);
	if(status != CCS881_SUCCESS)
		return status;
	if(register_value != 0x81)
		return CCS881_ID_ERR;

	/* Reset the device & wait a bit */
	status = CCS881_reset();
	if(status != CCS881_SUCCESS)
		return status;
	HAL_Delay(100);

	/* Check for sensor errors */
	if(CCS811_read_status_error() != 0){
		//uint8_t err = CCS811_read_error_id();
		return CCS881_ERROR;
	}

	/* Check if app is valid */
	if(CCS811_read_app_valid() != 1)
		return CCS881_ERROR;

	/* Write to app start register to start */
	status = CCS811_app_start();
	if(status != CCS881_SUCCESS)
		return CCS881_I2C_ERROR;

	/* Set drive mode to 1; measurement each second */
	status = CCS811_write_mode(1);
	if(status != CCS881_SUCCESS)
		return status;

	/* Check for sensor errors before exiting */
	if(CCS811_read_status_error() != 0){
		//uint8_t err = CCS811_read_error_id();
		return CCS881_ERROR;
	}

	return status;
}

/* Read a register using I2C */
SENSOR_STATUS
CCS811_read_register(uint8_t reg_addr, uint8_t* buffer)
{
	HAL_StatusTypeDef status = HAL_OK;
	status = HAL_I2C_Mem_Read(&hi2c3, CCS881_ADDR, (uint8_t) reg_addr, I2C_MEMADD_SIZE_8BIT, buffer, 1, HAL_MAX_DELAY);
	if(status != HAL_OK)
		 return CCS881_I2C_ERROR;
	return CCS881_SUCCESS;
}

/* Write to a register using I2C */
SENSOR_STATUS
CCS811_write_register(uint8_t reg_addr, uint8_t* buffer, uint8_t size){

	HAL_StatusTypeDef status = HAL_OK;
	status = HAL_I2C_Mem_Write(&hi2c3, CCS881_ADDR, (uint8_t) reg_addr, I2C_MEMADD_SIZE_8BIT, buffer, size, HAL_MAX_DELAY);
	if(status != HAL_OK)
		 return CCS881_I2C_ERROR;
	return CCS881_SUCCESS;
}

/* Read bit 0, which is the status error bit, if 1 is returned there was an error
   if 0 is returned no errors have occurred.	 	 							   */
uint8_t
CCS811_read_status_error(void){
	uint8_t register_value;
	CCS811_read_register(STATUS_REG, &register_value);
	return (register_value & 0x01);
}

/* Read error id register and return error bits */
uint8_t
CCS811_read_error_id(void){
	uint8_t register_value;
	CCS811_read_register(ERROR_ID, &register_value);
	return register_value;
}

/* Check that the app is valid */
uint8_t
CCS811_read_app_valid(void){
	uint8_t register_value;
	CCS811_read_register(STATUS_REG, &register_value);
	register_value = (register_value >> 4) & 0x01;
	return register_value;
}

/* Start the application, it shouldnt send any data so this uses master transmit... */
SENSOR_STATUS
CCS811_app_start(void){
	uint8_t app_start = APP_START;
	HAL_StatusTypeDef status = HAL_OK;

	status = HAL_I2C_Master_Transmit(&hi2c3, CCS881_ADDR, &app_start, 1, HAL_MAX_DELAY);
	if(status != HAL_OK)
		return CCS881_I2C_ERROR;
	return CCS881_SUCCESS;
}

/* Set mode, changes the interval of measurements */
SENSOR_STATUS
CCS811_write_mode(uint8_t mode){
	uint8_t register_value = 0;
	SENSOR_STATUS status = CCS881_SUCCESS;

	/* Check what's in the register */
	status = CCS811_read_register(MEAS_MODE, &register_value);
	if(status != CCS881_SUCCESS)
		return CCS881_I2C_ERROR;

	/* Clear current, and add new mode that should be set */
	register_value = register_value & ~(0x70);
	register_value = register_value | (mode << 4);

	/* Write the mode */
	status = CCS811_write_register(MEAS_MODE, &register_value, 1);
	if(status != CCS881_SUCCESS)
		return CCS881_I2C_ERROR;

	return status;
}

/* Reset the sensor */
SENSOR_STATUS
CCS881_reset(void){
	uint8_t reset_key[4] = {0x11, 0xE5, 0x72, 0x8A};
	if(CCS811_write_register(SW_RESET, reset_key, 4) != CCS881_SUCCESS)
		return CCS881_I2C_ERROR;
	return CCS881_SUCCESS;
}


/**********************************************************************
 **********************************************************************
 ***																***
 ***						BME FUNCTIONS							***
 ***																***
 **********************************************************************
 **********************************************************************/


SENSOR_STATUS
BME280_read_register8(uint8_t reg_addr, uint8_t* buffer)
{
	HAL_StatusTypeDef status = HAL_OK;
	status = HAL_I2C_Mem_Read(&hi2c3, BME280_ADDR, (uint8_t) reg_addr, I2C_MEMADD_SIZE_8BIT, buffer, 1, HAL_MAX_DELAY);
	if(status != HAL_OK)
		 return BME280_I2C_ERROR;
	return BME280_SUCCESS;
}

SENSOR_STATUS
BME280_read_register16(uint8_t reg_addr, uint16_t* buffer)
{
	uint8_t buf[2];
	HAL_StatusTypeDef status = HAL_OK;
	status = HAL_I2C_Mem_Read(&hi2c3, BME280_ADDR, (uint8_t) reg_addr, I2C_MEMADD_SIZE_8BIT, buf, 2, HAL_MAX_DELAY);
	if(status != HAL_OK)
		 return BME280_I2C_ERROR;
	*buffer = (uint16_t) ((buf[1] << 8) | buf[0]);
	return BME280_SUCCESS;
}


SENSOR_STATUS
BME280_init(void){

	SENSOR_STATUS status = BME280_SUCCESS;
	uint8_t register_value = 0;

	/* Read the ID register to make sure the sensor is responsive */
	status = BME280_read_register8(ID_REG, &register_value);
	if(status != BME280_SUCCESS)
		return status;
	if(register_value != 0x60)
		return BME280_ID_ERR;

	/* Set normal operation */



	return status;
}

SENSOR_STATUS
BME280_read_calibration(void){

	uint16_t dig_H4_temp; // [11:4]
	uint16_t dig_H5_temp; // [7:4]

	SENSOR_STATUS status = BME280_SUCCESS;
	status = BME280_read_register16(dig_T1_reg, 		&dig_T1_val);
	status = BME280_read_register16(ID_REG, (uint16_t*) &dig_T2_val);
	status = BME280_read_register16(ID_REG, (uint16_t*) &dig_T3_val);
	status = BME280_read_register8 (ID_REG, 			&dig_H1_val);
	status = BME280_read_register16(ID_REG, (uint16_t*) &dig_H2_val);
	status = BME280_read_register8 (ID_REG, 			&dig_H3_val);
	status = BME280_read_register16(ID_REG, 			&dig_H4_temp);
	status = BME280_read_register16(ID_REG, 			&dig_H5_temp);
	status = BME280_read_register  (ID_REG, (uint8_t*)	&dig_H6_val);

	if(status != BME280_SUCCESS)
		return status;

	/* Move h4 and h5 to correct positions */
	dig_H4_val = ((dig_H4_temp & 0x00FF) << 4);
	dig_H4_val = (dig_H4_val | ((dig_H4_temp & 0x0F00) >> 8));
	dig_H5_val = dig_H5_temp >> 4;

	return status;
}



	/*
uint8_t initialize_sensor(void)
{
	while (assert_sensor_has_started() != 0)
	{
	//Pull nWake down during transmission
uint8_t nulldata = 0x00;
HAL_I2C_Mem_Write(&hi2c1, DEVICE_ADDR, APP_START, 8, &nulldata, 0, 1000);
//Pull up nWake
	}
return 0;
	return 0;
}
    */

	/*
uint8_t assert_sensor_has_started(void)
{
	uint8_t status = access_status_register();      //Get status from air quality sensor
	if (((status >> 4) & 9) == 9)        //Check that loadable firmware exists and operational mode is in application mode
    {return 0;}                          //if so, return normal operation-code 0
    else
    {return 1;}                          //otherwise return error code 1
	return 0;
}
    */

	/*
uint8_t assert_no_error(void)
{
	uint8_t status = access_status_register();
	return status & 0x1;
	return 0;
}
	*/


	/*
uint8_t set_mode(uint8_t mode)
{
	if (mode < 0 || mode > 4)
	{return 1;}
	else
	{
		//Pull down nWake
		uint8_t set = (((mode << 4) & 0x70) + 4);        //Sets the set measurement mode, and sets data ready-interrupt
		HAL_I2C_Mem_Write(&hi2c, DEVICE_ADDR, MEASREG, 8, &set, 1, 1000);   //Transmit mode via I2C
		//Pull up nWake
	}
	if (mode == 4)
		return 4;
	else
		return 0;
	return 0;
}
	*/

	/*
void recieve_data(void)
{
uint8_t datarr[8];
//pull down nWake
HAL_I2C_Mem_Read(&hi2c, DEVICE_ADDR, ALG_RESDATA, 8, datarr, 8, 1000);  //Receive all 8 bytes from the data results-register
if (assert_no_error() == 0)
{
	H_CO2 = datarr[0];
	L_CO2 = datarr[1];
	H_OG = datarr[2];
	L_OG = datarr[3];
}
else
	error_response();
}

void error_response(void)
{

}

	*/
