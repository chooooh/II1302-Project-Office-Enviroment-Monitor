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

/* Current return status */
static RETURN_STATUS current_status;

void office_environment_monitor(void){

	/* Initiate the wifi module */
	if(esp8266_start() == ESP8266_START_ERROR)
		error_handler();

	/* Connect to wifi */
	if(esp8266_wifi_start() == ESP8266_WIFI_ERROR)
		error_handler();


	for(;;){

	}
}


void error_handler(void){
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
