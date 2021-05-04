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
static RETURN_STATUS 	 current_status;			// return status for functions within this program
static ENV_SENSOR_STATUS current_sensor_status; // return status for environmental sensor functions

/* Temperature and humidity */
static float	 		 temperature;
static float			 humidity;

void office_environment_monitor(void){

	/* Initiate display, if the init fails, leds will flash and it will try to init again */
	display_init();
	display_start_screen();
	HAL_Delay(2000);
	reset_screen_canvas();

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

		if(CCS811_data_available() == CCS811_NEW_DATA){

			CCS811_read_alg_res();
			temperature = BME280_read_temp();
			humidity = BME280_read_hum();
			CCS811_set_temp_hum(temperature, humidity);

			printf("CO2: %dppm\ntVoc: %dppb\n", CCS811_get_co2(), CCS811_get_tvoc());
			printf("temp: %f\nhum: %f\n", temperature, humidity);
			printf("----------------------------\n");
		}
		else if(CCS811_read_status_error()){
			error_handler();
		}
	}
}


void error_handler(void){

	/* Display errors here */
	while(1);
}


void display_startscreen(void){
	display_set_position(1, (display_get_y() + ROW_SIZE));
	display_write_string("Office", WHITE);
	display_set_position(1, (display_get_y() + ROW_SIZE));
	display_write_string("Environment", WHITE);
	display_set_position(1, (display_get_y() + ROW_SIZE));
	display_write_string("Monitor", WHITE);
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
