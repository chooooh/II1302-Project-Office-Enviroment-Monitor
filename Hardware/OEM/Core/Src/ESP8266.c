/**
******************************************************************************
@brief functions for the ESP8266 wifi-module
@details
@file ESP8266.c
@author  Jonatan Lundqvist Silins, jonls@kth.se
@date 06-04-2021
@version 1.1
*******************************************************************************/
#include "ESP8266.h"

static uint8_t rx_variable;
static char rx_buffer[RX_BUFFER_SIZE];
static uint8_t rx_buffer_index = 0;
static bool error_flag = false;
static bool fail_flag = false;


void
init_uart_interrupt(void){
	HAL_UART_Receive_IT(&huart4, &rx_variable, 1);
}

void
HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{

   if (huart->Instance == UART4) {
      rx_buffer[rx_buffer_index++] = rx_variable;    // Add 1 byte to Rx_Buffer
    }
      HAL_UART_Receive_IT(&huart4, &rx_variable, 1);
}

/* djb2 hashing algorithm */
const unsigned long
hash(const char *str) {
    unsigned long hash = 5381;
    int c;

    while ((c = *str++))
        hash = ((hash << 5) + hash) + c;
    return hash;
}

const char*
ESP8266_send_command(const char* command){

	rx_buffer_index = 0;
	error_flag = false;
	fail_flag = false;

	memset(rx_buffer, 0, RX_BUFFER_SIZE);
	HAL_UART_Transmit(&huart4, (uint8_t*) command, strlen(command), 100);

	// wait for OK or ERROR/FAIL
	while((strstr(rx_buffer, ESP8266_AT_OK_TERMINATOR) == NULL)){
		if(strstr(rx_buffer, ESP8266_AT_ERROR) != NULL){
			error_flag = true;
			break;
		}
		if(strstr(rx_buffer, ESP8266_AT_FAIL) != NULL){
			fail_flag = true;
			break;
		}
	}

	return get_return(command);
}

const char* ESP8266_send_data(const char* command){
	rx_buffer_index = 0;
	error_flag = false;
	fail_flag = false;

	memset(rx_buffer, 0, RX_BUFFER_SIZE);
	HAL_UART_Transmit(&huart4, (uint8_t*) command, strlen(command), 100);

	while((strstr(rx_buffer, ESP8266_AT_CLOSED) == NULL));

	return ESP8266_AT_CLOSED;
}


void
ESP8266_get_wifi_command(char* ref){
	sprintf (ref, "%s\"%s\",\"%s\"\r\n", ESP8266_AT_CWJAP_SET, SSID, PWD);
}

void
ESP8266_get_connection_command(char* ref, char* connection_type, char* remote_ip, char* remote_port){
	sprintf(ref, "%s\"%s\",\"%s\",%s\r\n", ESP8266_AT_START, connection_type, remote_ip, remote_port);
}

const char*
get_return(const char* command){

	// TODO: avoid using too many strstr... use 1+ argument for id?

	if(strstr(command, ESP8266_AT_CWJAP_SET) != NULL)
		command = ESP8266_AT_CWJAP_SET;
	else if(strstr(command, ESP8266_AT_START) != NULL)
		command = ESP8266_AT_START;
	else if(strstr(command, ESP8266_AT_SEND) != NULL)
		command = ESP8266_AT_SEND;

	KEYS return_type = hash(command);
	switch (return_type) {

		case ESP8266_AT_KEY:

		case ESP8266_AT_GMR_KEY:

		case ESP8266_AT_RST_KEY:

		case ESP8266_AT_CWMODE_STATION_MODE_KEY:

		case ESP8266_AT_CIPMUX_KEY:

		case ESP8266_AT_CWQAP_KEY:
			return evaluate(error_flag, fail_flag);

		case ESP8266_AT_CWMODE_TEST_KEY:
			if(error_flag || fail_flag)
				return ESP8266_AT_ERROR;
			else {
				if (strstr(rx_buffer, ESP8266_AT_CWMODE_1) != NULL)
					return ESP8266_AT_CWMODE_1;
				else if(strstr(rx_buffer, ESP8266_AT_CWMODE_2) != NULL)
					return ESP8266_AT_CWMODE_2;
				else if(strstr(rx_buffer, ESP8266_AT_CWMODE_3) != NULL)
					return ESP8266_AT_CWMODE_3;
				else
					return ESP8266_AT_UNKNOWN;
			}

		case ESP8266_AT_CWJAP_TEST_KEY:
			if(error_flag || fail_flag)
				return ESP8266_AT_ERROR;
			else {
				if(strstr(rx_buffer, ESP8266_AT_NO_AP))
					return ESP8266_AT_WIFI_DISCONNECTED;
				else
					return ESP8266_AT_WIFI_CONNECTED;
			}

		case ESP8266_AT_CWJAP_SET_KEY:
			if(fail_flag){
				if (strstr(rx_buffer, ESP8266_AT_CWJAP_1) != NULL)
					return ESP8266_AT_TIMEOUT;
				else if((strstr(rx_buffer, ESP8266_AT_CWJAP_2) != NULL))
					return ESP8266_AT_WRONG_PWD;
				else if((strstr(rx_buffer, ESP8266_AT_CWJAP_3) != NULL))
					return ESP8266_AT_NO_TARGET;
				else if((strstr(rx_buffer, ESP8266_AT_CWJAP_4) != NULL))
					return ESP8266_AT_CONNECTION_FAIL;
				else
					return ESP8266_AT_UNKNOWN;
			}
			else
				return ESP8266_AT_WIFI_CONNECTED;

		case ESP8266_AT_CIPMUX_TEST_KEY:
			if(error_flag || fail_flag)
				return ESP8266_AT_ERROR;
			else {
				if (strstr(rx_buffer, ESP8266_AT_CIPMUX_0) != NULL)
					return ESP8266_AT_CIPMUX_0;
				else
					return ESP8266_AT_CIPMUX_1;
			}

		case ESP8266_AT_START_KEY:
			if(error_flag || fail_flag)
				return ESP8266_AT_ERROR;
			return ESP8266_AT_CONNECT;

		case ESP8266_AT_SEND_KEY:
			if(error_flag || fail_flag)
				return ESP8266_AT_ERROR;
			return ESP8266_AT_SEND_OK;

		default:
			return ESP8266_NOT_IMPLEMENTED;
			break;
	}
}

const char*
evaluate(bool ERROR_FLAG, bool FAIL_FLAG){
	if(error_flag || fail_flag)
		return ESP8266_AT_ERROR;
	return ESP8266_AT_OK;
}
