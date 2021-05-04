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

#include <CCS811_BME280.h>
#include "main.h"


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
int32_t  t_fine;

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
BME280_init(void){

	SENSOR_STATUS status = BME280_SUCCESS;
	uint8_t register_value = 0;

	if (((BME280_read_register8(ID_REG, &register_value, 1)) & (BME280_read_calibration()) & (BME280_config()) & (BME280_set_mode(0)) & (BME280_set_hum_os()) & (BME280_set_temp_os())) == 5)

	{
	/* Read the ID register to make sure the sensor is responsive */
//	status = BME280_read_register8(ID_REG, &register_value, 1);
//	if(status != BME280_SUCCESS)
//		return status;
//	if(register_value != 0x60)
//		return BME280_ID_ERR;

	/* Read calibration data for humidity and temperature */
//	status = BME280_read_calibration();
//	if(status != BME280_SUCCESS)
//		return status;

	/* Standard config for filter and rate */
//	status = BME280_config();
//	if(status != BME280_SUCCESS)
//		return status;

	/* Set mode to 0 */
//	status = BME280_set_mode(0);
//	if(status != BME280_SUCCESS)
//		return status;

	/* Set humidity oversample */
//	status = BME280_set_hum_os();
//	if(status != BME280_SUCCESS)
//		return status;

	/* Set temperature oversample ****last for hum changes to be applied*****/
//	status = BME280_set_temp_os();
//	if(status != BME280_SUCCESS)
//		return status;

	uint8_t mode = 0;
	mode = BME280_get_mode();

	/* Set normal operation */
	status = BME280_set_mode(3);
	if(status != BME280_SUCCESS)
		return status;

	mode = BME280_get_mode();

	/* read status 0xF3 ? */
	HAL_Delay(100);

	/* Read temp first to set t_fine */
	float temp = BME280_read_temp();

	HAL_Delay(100);

	/* Read humidity */
	float hum = BME280_read_hum();

	/*
	while(1){
		HAL_Delay(500);
		temp = BME280_read_temp();
		HAL_Delay(500);
		hum = BME280_read_hum();
		printf("temp: %f\nhum: %f\n", temp, hum);
		printf("----------------------------\n");
	}
	*/

	return status;
	}
	else
		Error_Handler();
}

SENSOR_STATUS
BME280_read_register8(uint8_t reg_addr, uint8_t* buffer, uint8_t size)
{
	HAL_StatusTypeDef status = HAL_OK;
	status = HAL_I2C_Mem_Read(&hi2c3, BME280_ADDR, (uint8_t) reg_addr, I2C_MEMADD_SIZE_8BIT, buffer, size, HAL_MAX_DELAY);
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

	/* Convert the 8bit array to 16 bit value */
	*buffer = (uint16_t) ((buf[1] << 8) | buf[0]);
	return BME280_SUCCESS;
}

SENSOR_STATUS
BME280_read_range(uint16_t reg_addr, uint8_t* buffer, uint16_t size){
	HAL_StatusTypeDef status = HAL_OK;
	reg_addr = reg_addr | (BME280_ADDR << 8);

	status = HAL_I2C_Master_Receive(&hi2c3, reg_addr, buffer, size, HAL_MAX_DELAY);
	if(status != HAL_OK)
		 return BME280_I2C_ERROR;

	return BME280_SUCCESS;
}

SENSOR_STATUS
BME280_write_register(uint8_t reg_addr, uint8_t* buffer, uint8_t size){

	HAL_StatusTypeDef status = HAL_OK;
	status = HAL_I2C_Mem_Write(&hi2c3, BME280_ADDR, (uint8_t) reg_addr, I2C_MEMADD_SIZE_8BIT, buffer, size, HAL_MAX_DELAY);
	if(status != HAL_OK)
		 return BME280_I2C_ERROR;
	return BME280_SUCCESS;

}

SENSOR_STATUS
BME280_read_calibration(void){

	uint16_t dig_H4_temp; // [11:4]
	uint16_t dig_H5_temp; // [7:4]

	// TODO: refactor this? --> && all statuses in one if?
	/* Signed variables need to be casted to unsigned when using the read functions */
	SENSOR_STATUS status = BME280_SUCCESS;
	status = BME280_read_register16(dig_T1_reg, 			&dig_T1_val);
	if(status != BME280_SUCCESS)
		return status;

	status = BME280_read_register16(dig_T2_reg, (uint16_t*) &dig_T2_val);
	if(status != BME280_SUCCESS)
		return status;

	status = BME280_read_register16(dig_T3_reg, (uint16_t*) &dig_T3_val);
	if(status != BME280_SUCCESS)
		return status;

	status = BME280_read_register8 (dig_H1_reg, 			&dig_H1_val, 1);
	if(status != BME280_SUCCESS)
		return status;

	status = BME280_read_register16(dig_H2_reg, (uint16_t*) &dig_H2_val);
	if(status != BME280_SUCCESS)
		return status;

	status = BME280_read_register8 (dig_H3_reg, 			&dig_H3_val, 1);
	if(status != BME280_SUCCESS)
		return status;

	status = BME280_read_register16(dig_H4_reg, 			&dig_H4_temp);
	if(status != BME280_SUCCESS)
		return status;

	status = BME280_read_register16(dig_H5_reg, 			&dig_H5_temp);
	if(status != BME280_SUCCESS)
		return status;

	status = BME280_read_register8 (dig_H6_reg, (uint8_t*)	&dig_H6_val, 1);
	if(status != BME280_SUCCESS)
		return status;

	/* Move h4 and h5 to correct positions :)))) */
	dig_H4_val = ((dig_H4_temp & 0x00FF) << 4);
	dig_H4_val = (dig_H4_val | ((dig_H4_temp & 0x0F00) >> 8));
	dig_H5_val = dig_H5_temp >> 4;

	return status;
}

SENSOR_STATUS
BME280_set_mode(uint8_t mode){

	uint8_t register_value = 0;
	SENSOR_STATUS status = BME280_SUCCESS;

	status = BME280_read_register8 (CTRL_MEAS, &register_value, 1);
	if(status != BME280_SUCCESS)
		return status;
	register_value = register_value & 0xFC;
	register_value = register_value | mode;

	status = BME280_write_register(CTRL_MEAS, &register_value, 1);

	return status;
}

uint8_t
BME280_get_mode(void){
	uint8_t register_value = 0;
	BME280_read_register8 (CTRL_MEAS, &register_value, 1);
	return (register_value & 0x03);
}

/* Set standard config for filter and rate */
SENSOR_STATUS
BME280_config(void){

	uint8_t register_value = 0;
	SENSOR_STATUS status = BME280_SUCCESS;

	status = BME280_read_register8 (CONFIG_REG, &register_value, 1);
	if(status != BME280_SUCCESS)
		return status;
	register_value = register_value & 0b00000010;
	register_value = register_value | std_cnf;

	status = BME280_write_register(CONFIG_REG, &register_value, 1);

	return status;
}

/* Set humidity oversampling to 1x */
SENSOR_STATUS
BME280_set_hum_os(void){

	SENSOR_STATUS status = BME280_SUCCESS;
	uint8_t register_value = 0;

	status = BME280_read_register8 (CTRL_HUM, &register_value, 1);
	register_value = register_value & 0b11111000;
	register_value = register_value | std_hum;

	status = BME280_write_register(CTRL_HUM, &register_value, 1);

	uint8_t temp;
	status = BME280_read_register8 (CTRL_HUM, &temp, 1);


	return status;

}

/* Set temperature oversampling to 1x */
SENSOR_STATUS
BME280_set_temp_os(void){

	SENSOR_STATUS status = BME280_SUCCESS;
	uint8_t register_value = 0;

	status = BME280_read_register8 (CTRL_MEAS, &register_value, 1);
	register_value = register_value & 0b00011111;
	register_value = register_value | std_temp;

	status = BME280_write_register(CTRL_MEAS, &register_value, 1);

	return status;
}

float
BME280_read_temp(void){

	uint8_t buf[8];
	BME280_read_register8(0xF7, buf, 8);
	int32_t adc_Temp = ((uint32_t)buf[3] << 12) | ((uint32_t)buf[4] << 4) | ((buf[5] >> 4) & 0x0F);

	/* TEMPERATURE CONVERSION FROM DATASHEET */
	int64_t var1;
	int64_t var2;

	var1 = ((((adc_Temp>>3) - ((int32_t)dig_T1_val<<1))) * ((int32_t)dig_T2_val)) >> 11;
	var2 = (((((adc_Temp>>4) - ((int32_t)dig_T1_val)) * ((adc_Temp>>4) - ((int32_t)dig_T1_val))) >> 12) * ((int32_t)dig_T3_val)) >> 14;
	t_fine = var1 + var2;
	float output = (t_fine * 5 + 128) >> 8;

	output = output / 100 + 0.f;

	return output;
}

float
BME280_read_hum(void){

	uint8_t buf[8];
	BME280_read_register8(0xF7, buf, 8);

	/* HUMIDITY CONVERSION FROM DATASHEET */
	int32_t adc_H = ((uint32_t)buf[6] << 8) | ((uint32_t)buf[7]);

	int32_t var1;
	var1 = (t_fine - ((int32_t)76800));
	var1 = (((((adc_H << 14) - (((int32_t)dig_H4_val) << 20) - (((int32_t)dig_H5_val) * var1)) +
	((int32_t)16384)) >> 15) * (((((((var1 * ((int32_t)dig_H6_val)) >> 10) * (((var1 * ((int32_t)dig_H3_val)) >> 11) + ((int32_t)32768))) >> 10) + ((int32_t)2097152)) *
	((int32_t)dig_H2_val) + 8192) >> 14));
	var1 = (var1 - (((((var1 >> 15) * (var1 >> 15)) >> 7) * ((int32_t)dig_H1_val)) >> 4));
	var1 = (var1 < 0 ? 0 : var1);
	var1 = (var1 > 419430400 ? 419430400 : var1);

	return (float)(var1>>12) / 1024.0;
}
