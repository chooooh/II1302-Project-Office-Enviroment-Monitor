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
static const char* esp8266_return_string;

/* Temperature and humidity */
static float	 		 temperature;
static float			 humidity;

void office_environment_monitor(void){

	/* Initiate display, if the init fails, leds will flash and it will try to init again */
	display_init();
	display_startscreen();
	HAL_Delay(2000);
	reset_screen_canvas();

	/* Initiate the wifi module */
	display_write_string("Starting ESP8266", WHITE);
	current_status = esp8266_start();
	if(current_status == ESP8266_START_ERROR){
		reset_screen_canvas();
		display_write_string("ESP8266 ERROR", WHITE);
		error_handler();
	}
	display_set_position(1, (display_get_y() + ROW_SIZE));
	display_write_string("STARTED", WHITE);
	reset_screen_canvas();

	/* Connect to WIFI */
	display_write_string("Connecting to WIFI", WHITE);
	current_status = esp8266_wifi_start();
	if(current_status == ESP8266_WIFI_ERROR){
		reset_screen_canvas();
		display_write_string("WIFI ERROR", WHITE);
		error_handler();
	}
	display_set_position(1, (display_get_y() + ROW_SIZE));
	display_write_string(esp8266_return_string, WHITE);
	reset_screen_canvas();

	/* Initiate CCS811 for CO2 and tVOC measurements */
	display_write_string("Starting CCS811", WHITE);
	current_status = ccs811_start();
	if(current_status == CCS811_START_ERROR){
		reset_screen_canvas();
		char buf2[10] = {};
		sprintf (buf2,"%d", CCS811_read_error_id());
		display_write_string(buf2, WHITE);
		error_handler();
	}
	display_set_position(1, (display_get_y() + ROW_SIZE));
	display_write_string("STARTED", WHITE);
	reset_screen_canvas();

	/* Initiate BME280 for humidity and temperature */
	display_write_string("Starting BME280", WHITE);
	current_status = bme280_start();
	if(current_status == BME280_START_ERROR){
		reset_screen_canvas();
		display_write_string("BME280 ERROR", WHITE);
		error_handler();
	}
	display_set_position(1, (display_get_y() + ROW_SIZE));
	display_write_string("STARTED", WHITE);
	reset_screen_canvas();

	uint8_t count = 0;
	for(;;){

		if(CCS811_data_available() == CCS811_NEW_DATA){

			count++;
			CCS811_read_alg_res();
			temperature = BME280_read_temp();
			humidity = BME280_read_hum();
			CCS811_set_temp_hum(temperature, humidity);
			uint16_t co2 = CCS811_get_co2();
			uint16_t tVoc = CCS811_get_tvoc();

			show_measurements(co2, tVoc);

			if(count == 60){
				count = 0;
				if(esp8266_web_connection() != ESP8266_WEB_CONNECTED)
					while(1); // temporary
				if(esp8266_web_request(co2, tVoc) != ESP8266_WEB_REQUEST_SUCCESS)
					while(1); // temporary
			}

		}
		else if(CCS811_read_status_error()){
			reset_screen_canvas();
			char buf[10] = {};
			sprintf (buf,"%d", CCS811_read_error_id());
			display_write_string(buf, WHITE);
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
	display_write_string("Office            "
						 "Environment       "
						 "Monitor           ", WHITE);
}

// TODO: make the output be one single string so the display updates smoothly
void show_measurements(uint16_t co2, uint16_t tVoc){

	/* String buffers */
	char buffer    [38] = {};
	char tempbuffer[15] = {};
	char humbuffer [15] = {};
	char co2buffer [19] = {};
	char tvocbuffer[19] = {};

	/* Make temperature and humidity output and print on screen */
	snprintf (tempbuffer, 15, "Temp: %f" , temperature);
	snprintf (humbuffer,  15, "Hum:  %f" , humidity);
	sprintf  (buffer, "%s    %s    ", tempbuffer, humbuffer);
	display_write_string(buffer, WHITE);

	/* Make co2 output and print on screen */
	sprintf  (co2buffer, "CO2:  %dppm   ", co2);
	display_write_string(co2buffer, WHITE);
	display_set_position(1, (display_get_y() + ROW_SIZE));

	/* Make tVOC output and print on screen */
	sprintf  (tvocbuffer, "tVoc: %dppb   ", tVoc);
	display_write_string(tvocbuffer, WHITE);
	display_set_position(1, 1);

}

/* Initiates the wifi module */
RETURN_STATUS esp8266_start(void){

	/* Enable interrupts for UART4 */
	init_uart_interrupt();

	/* Module needs to return OK else an error has occurred */
	esp8266_return_string = esp8266_init();
	if(strcmp(esp8266_return_string, ESP8266_AT_OK) != 0){
		current_status = ESP8266_START_ERROR;
		return current_status;
	}
	current_status = ESP8266_START_SUCCESS;
	return current_status;
}

/* Connects the module to wifi */
RETURN_STATUS esp8266_wifi_start(void){

	/* Module needs to return WIFI CONNECTED else an error has occurred */
	esp8266_return_string = esp8266_wifi_init();
	if(strcmp(esp8266_return_string, ESP8266_AT_WIFI_CONNECTED) != 0){
		current_status = ESP8266_WIFI_ERROR;
		return current_status;
	}
	current_status = ESP8266_WIFI_SUCCESS;
	return current_status;
}

/* Start connection to website */
RETURN_STATUS esp8266_web_connection(void){
	char connection_command[256] = {0};
	char remote_ip[] 			 = "ii1302-project-office-enviroment-monitor.eu-gb.mybluemix.net";
	char type[] 				 = "TCP";
	char remote_port[] 		     = "80";

	esp8266_get_connection_command(connection_command, type, remote_ip, remote_port);
	esp8266_return_string = esp8266_send_command(connection_command); // ,
	if(strcmp(esp8266_return_string, ESP8266_AT_CONNECT) != 0){
		current_status = ESP8266_WEB_DISCONNECTED;
		return current_status;
	}
	current_status = ESP8266_WEB_CONNECTED;
	return current_status;
}

RETURN_STATUS esp8266_web_request(uint16_t co2, uint16_t tvoc){
	//"GET /api/sensor HTTP/1.1\r\nHost: ii1302-project-office-enviroment-monitor.eu-gb.mybluemix.net\r\nConnection: close\r\n\r\n";
	///api/sensor/airquality?carbon=10&volatile=10 HTTP/1.1
	char request[256] = {0};
	char init_send[64] = {0};
	char uri[50] = "api/sensor/airquality?";
	char data[40] = {0};
	char host[] = "ii1302-project-office-enviroment-monitor.eu-gb.mybluemix.net";
	sprintf  (data, "carbon=%d&volatile=%d", co2, tvoc);
	strcat(uri,data);

	uint8_t len = esp8266_http_get_request(request, HTTP_POST, uri, host);
	esp8266_get_at_send_command(init_send, len);

	esp8266_return_string = esp8266_send_command(init_send);
	if(strcmp(esp8266_return_string, ESP8266_AT_SEND_OK) != 0){
		current_status = ESP8266_WEB_REQUEST_ERROR;
		return current_status;
	}

	esp8266_return_string = esp8266_send_data(request);
	if(strcmp(esp8266_return_string, ESP8266_AT_CLOSED) != 0){
		current_status = ESP8266_WEB_REQUEST_ERROR;
		return current_status;
	}
	current_status = ESP8266_WEB_REQUEST_SUCCESS;
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


