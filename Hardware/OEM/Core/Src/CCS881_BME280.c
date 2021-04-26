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

/*
static uint8_t H_CO2 = 0;
static uint8_t L_CO2 = 0;
static uint8_t H_OG = 0;
static uint8_t L_OG = 0;
*/

SENSOR_STATUS
CCS881_init(void){

	uint8_t register_value = 0;

	/* read the HW ID register to make sure the sensor is responsive */
	CCS811_read_register(HW_ID, &register_value);
	if(register_value != 0x81)
		return CCS881_ID_ERR;

	/* more init here */


	return CCS881_SUCCESS; // success
}

/* Read a register using I2C */
void
CCS811_read_register(uint8_t reg_addr, uint8_t* buffer)
{

	HAL_I2C_Mem_Read(&hi2c3, DEVICE_ADDR, (uint8_t) reg_addr, I2C_MEMADD_SIZE_8BIT, buffer, 1, HAL_MAX_DELAY);
	while(HAL_I2C_GetState(&hi2c3) != HAL_I2C_STATE_READY);

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
