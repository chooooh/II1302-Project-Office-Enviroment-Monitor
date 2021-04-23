/**
******************************************************************************
@brief unit test for the office environment monitor project.
@details bla bla bla
@file unit_test.c
@author  Jonatan Lundqvist Silins, jonls@kth.se
@author  Sebastian Divander,       sdiv@kth.se
@date 29-03-2021
@version 1.0
******************************************************************************
*/

#include "unit_test.h"
#include "ESP8266.h"
#include "usart.h"
#include "stdio.h"

void setUp(void){
}

void tearDown(void){
}

void test_esp8266_init(void){
	RUN_TEST(test_esp8266_at_rst);
	RUN_TEST(test_esp8266_at);
	RUN_TEST(test_esp8266_at_cwqap);
	RUN_TEST(test_esp8266_at_cwmode_1);
	RUN_TEST(test_esp8266_at_cwmode_1_verify);
	RUN_TEST(test_esp8266_at_cipmux_set_single);
	RUN_TEST(test_esp8266_at_cipmux_verify);
}

void test_esp8266_wifi_connect(void){
	char wifi_command[256] = {0};
	esp8266_get_wifi_command(wifi_command);
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_WIFI_CONNECTED, esp8266_send_command(wifi_command));
}

void test_esp8266_web_connection(void){
	char connection_command[256] = {0};
	char remote_ip[] = "ii1302-project-office-enviroment-monitor.eu-gb.mybluemix.net";
	char type[] = "TCP";
	char remote_port[] = "80";
	esp8266_get_connection_command(connection_command, type, remote_ip, remote_port);
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_CONNECT, esp8266_send_command(connection_command));
}

void test_esp8266_web_request(void){
	//"GET /api/sensor HTTP/1.1\r\nHost: ii1302-project-office-enviroment-monitor.eu-gb.mybluemix.net\r\nConnection: close\r\n\r\n";
	char request[256] = {0};
	char init_send[64] = {0};
	char uri[] = "/api/sensor/airquality?data=22335";
	//char uri[] = "/api/sensor";
	char host[] = "ii1302-project-office-enviroment-monitor.eu-gb.mybluemix.net";

//	uint8_t len = esp8266_http_get_request(request, HTTP_GET, uri, host);
	uint8_t len = esp8266_http_get_request(request, HTTP_POST, uri, host);
	esp8266_get_at_send_command(init_send, len);

	test_esp8266_at_send(init_send);
	test_esp8266_send_data(request);
}

void unit_test(void){

	/* Set up */
	init_uart_interrupt();

	/* Test begin */
	UNITY_BEGIN();

	/* Test initiation of ESP8266 */
	RUN_TEST(test_esp8266_init);
	HAL_Delay(2000);

	/* Test connecting to wifi */
	RUN_TEST(test_esp8266_wifi_connect);
	RUN_TEST(test_esp8266_at_cwjap_verify);

	/* Test connecting to a website */
	RUN_TEST(test_esp8266_web_connection);

	/* Test making a http web request to connected website */
	RUN_TEST(test_esp8266_web_request);

	/* Test end*/
	UNITY_END();
}

void test_esp8266_at_rst(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_OK, esp8266_send_command(ESP8266_AT_RST));
}

void test_esp8266_at(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_OK, esp8266_send_command(ESP8266_AT));
}

void test_esp8266_at_cwqap(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_OK, esp8266_send_command(ESP8266_AT_CWQAP));
}

void test_esp8266_at_cwmode_1(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_OK, esp8266_send_command(ESP8266_AT_CWMODE_STATION_MODE));
}

void test_esp8266_at_cwmode_1_verify(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_CWMODE_1, esp8266_send_command(ESP8266_AT_CWMODE_TEST));
}

void test_esp8266_at_cwjap_verify(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_WIFI_CONNECTED, esp8266_send_command(ESP8266_AT_CWJAP_TEST));
}

void test_esp8266_at_cipmux_set_single(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_OK, esp8266_send_command(ESP8266_AT_CIPMUX_SINGLE));
}

void test_esp8266_at_cipmux_verify(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_CIPMUX_0, esp8266_send_command(ESP8266_AT_CIPMUX_TEST));
}

void test_esp8266_at_send(char* init_send){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_SEND_OK, esp8266_send_command(init_send));
}

void test_esp8266_send_data(char* request) {
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_CLOSED, esp8266_send_data(request));
}
