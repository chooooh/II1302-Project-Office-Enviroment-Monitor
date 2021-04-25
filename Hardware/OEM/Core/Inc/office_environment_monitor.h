/**
******************************************************************************
@brief Header for the office environment monitor main program
@file office_environment_monitor.h
@author Jonatan Lundqvist Silins, jonls@kth.se
******************************************************************************
*/

#include <stdio.h>
#include <ESP8266.h>

/* Status codes */
typedef enum
{
	ESP8266_START_SUCCESS = 0,
	ESP8266_START_ERROR,
	ESP8266_WIFI_SUCCESS,
	ESP8266_WIFI_ERROR
	// Environment sensor status codes go here
	// Distance sensor status codes go here
} RETURN_STATUS;

/**
 *
 */
void office_environment_monitor(void);

/**
 *
 */
void error_handler(void);

/**
 *
 */
RETURN_STATUS get_return_status(void);

/**
 *
 */
void set_return_status(RETURN_STATUS status_code);

/**
 *
 */
RETURN_STATUS esp8266_start(void);

/**
 *
 */
RETURN_STATUS esp8266_wifi_start(void);
