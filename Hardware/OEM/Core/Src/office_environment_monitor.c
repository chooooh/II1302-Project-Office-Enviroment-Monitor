/**
******************************************************************************
@brief main program for the office environment monitor project.
@details bla bla bla
@file office_environment_monitor.c
@author  Jonatan Lundqvist Silins, jonls@kth.se
@author  Sebastian Divander,       sdiv@kth.se
@date 29-03-2021
@version 1.0
******************************************************************************
*/


#include "office_environment_monitor.h"

/* Current return statuses */
static RETURN_STATUS current_status;			// return status for functions within this program
static ENV_SENSOR_STATUS current_sensor_status; // return status for environmental sensor functions

void office_environment_monitor(void){

	/* Initiate the wifi module */
	current_status = esp8266_start();
	if(current_status == ESP8266_START_ERROR)
		error_handler();

	/* Connect to wifi */
	current_status = esp8266_wifi_start();
	if(current_status == ESP8266_WIFI_ERROR)
		error_handler();

	/* Initiate CCS811 for CO2 and tVOC measurements */
	current_status = ccs811_start();
	if(current_status == CCS811_START_ERROR)
		error_handler();

	/* Initiate BME280 for humidity and temperature */
	current_status = bme280_start();
	if(current_status == BME280_START_ERROR)
		error_handler();

	for(;;){

	}
}


void error_handler(void){

	/* Display errors here */
	while(1);
}

/* Initiates the wifi module */
RETURN_STATUS esp8266_start(void){

	/* Enable interrupts for UART4 */
	init_uart_interrupt();

	/* Module needs to return OK else an error has occurred */
	if(strcmp(esp8266_init(), ESP8266_AT_OK) != 0){
		current_status = ESP8266_START_ERROR;
		return current_status;
	}
	current_status = ESP8266_START_SUCCESS;
	return current_status;
}

/* Connects the module to wifi */
RETURN_STATUS esp8266_wifi_start(void){

	/* Module needs to return WIFI CONNECTED else an error has occurred */
	if(strcmp(esp8266_wifi_init(), ESP8266_AT_WIFI_CONNECTED) != 0){
		current_status = ESP8266_WIFI_ERROR;
		return current_status;
	}
	current_status = ESP8266_WIFI_SUCCESS;
	return current_status;
}

/* Initiate CCS811 */
RETURN_STATUS ccs811_start(void){

	current_sensor_status = CCS811_init();
	if(current_sensor_status != CCS811_SUCCESS){
		return CCS811_START_ERROR;
	}
	return CCS811_START_SUCCESS;
}

/* Initiate BME280 */
RETURN_STATUS bme280_start(void){

	current_sensor_status = BME280_init();
	if(current_sensor_status != BME280_SUCCESS){
			return BME280_START_ERROR;
	}
	return BME280_START_SUCCESS;
}
