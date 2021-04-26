/*
 * Luftkvalitetsensor_funktioner.c
 *
 *  Created on: Apr 6, 2021
 *      Author: Sebastian Divander, sdiv@kth.se
 *   last upd.: Apr 6, 2021
 */
#include <i2c.h>
#include <stdint.h>

#define DEVICE_ADDR 0x5a
#define STATUSREG 0x00
#define APP_START 0xf4
#define MEASREG 0x01
#define ALG_RESDATA 0x02
#define RAWDATAREG 0x03


static uint8_t H_CO2 = 0;
static uint8_t L_CO2 = 0;
static uint8_t H_OG = 0;
static uint8_t L_OG = 0;

uint8_t initialize_sensor(void)
{
	/*
	while (assert_sensor_has_started() != 0)
	{
	//Pull nWake down during transmission
uint8_t nulldata = 0x00;
HAL_I2C_Mem_Write(&hi2c1, DEVICE_ADDR, APP_START, 8, &nulldata, 0, 1000);
//Pull up nWake
	}
return 0;
    */
	return 0;
}

uint8_t assert_sensor_has_started(void)
{
	/*
	uint8_t status = access_status_register();      //Get status from air quality sensor
	if (((status >> 4) & 9) == 9)        //Check that loadable firmware exists and operational mode is in application mode
    {return 0;}                          //if so, return normal operation-code 0
    else
    {return 1;}                          //otherwise return error code 1
    */
	return 0;
}

uint8_t assert_no_error(void)
{
	/*
	uint8_t status = access_status_register();
	return status & 0x1;
	*/
	return 0;
}

uint8_t access_status_register(void)
{
	/*
	//Pull down nWake
		uint8_t status;   //variable that will hold the status
		HAL_I2C_Mem_Read(&hi2c, DEVICE_ADDR, STATUSREG, 8, &status, 1, 1000);    //Receive data via I2C
		//Pull up nWake
        return status;
     */
	return 0;
}

uint8_t set_mode(uint8_t mode)
{
	/*
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
	*/
	return 0;
}

void recieve_data(void)
{
	/*
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
	*/
}

void error_response(void)
{

}
