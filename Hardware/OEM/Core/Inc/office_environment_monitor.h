/**
******************************************************************************
@brief Header for the office environment monitor main program
@file office_environment_monitor.h
@author Jonatan Lundqvist Silins, jonls@kth.se
******************************************************************************
*/

#include "stdio.h"
#include "ESP8266.h"
#include "CCS811_BME280.h"
#include "disp.h"
#include "math.h"

/* Status codes */
typedef enum
{
	ESP8266_START_SUCCESS = 0,
	ESP8266_START_ERROR,
	ESP8266_WIFI_SUCCESS,
	ESP8266_WIFI_ERROR,
	ESP8266_WEB_CONNECTED,
	ESP8266_WEB_DISCONNECTED,
	ESP8266_WEB_REQUEST_SUCCESS,
	ESP8266_WEB_REQUEST_ERROR,
	CCS811_START_SUCCESS,
	CCS811_START_ERROR,
	BME280_START_SUCCESS,
	BME280_START_ERROR
	// Environment sensor status codes go here
	// Distance sensor status codes go here
} RETURN_STATUS;

/**
 *
 */
void display_startscreen(void);

/**
 *
 */
void show_measurements(uint16_t co2, uint16_t tVoc);

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

/**
 *
 */
RETURN_STATUS esp8266_web_connection(void);

/**
 *
 */
RETURN_STATUS esp8266_web_request(uint16_t co2, uint16_t tvoc);

/**
 *
 */
RETURN_STATUS ccs811_start(void);

/**
 *
 */
RETURN_STATUS bme280_start(void);
