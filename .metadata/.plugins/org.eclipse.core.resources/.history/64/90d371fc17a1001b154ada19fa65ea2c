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

void setUp(void){
}

void tearDown(void){
}

void test_ESP8266_AT_RST(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_OK, ESP8266_send_command(ESP8266_AT_RST));
}

void test_ESP8266_AT(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_OK, ESP8266_send_command(ESP8266_AT));
}

void test_ESP8266_AT_GMR(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_OK, ESP8266_send_command(ESP8266_AT_GMR));
}

void test_ESP8266_AT_CWQAP(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_OK, ESP8266_send_command(ESP8266_AT_CWQAP));
}

void test_ESP8266_AT_CWMODE_1(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_OK, ESP8266_send_command(ESP8266_AT_CWMODE_STATION_MODE));
}

void test_ESP8266_AT_CWMODE_1_VERIFY(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_CWMODE_1, ESP8266_send_command(ESP8266_AT_CWMODE_TEST));
}

void test_ESP8266_AT_CWJAP_VERIFY(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_WIFI_CONNECTED, ESP8266_send_command(ESP8266_AT_CWJAP_TEST));
}

void test_ESP8266_AT_CIPMUX_SET(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_OK, ESP8266_send_command(ESP8266_AT_CIPMUX));
}

void test_ESP8266_CIPMUX_VERIFY(void){
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_CIPMUX_0, ESP8266_send_command(ESP8266_AT_CIPMUX_TEST));
}

void test_ESP8266_wifi_connect(void){
	char wifi_command[256] = {0};
	ESP8266_get_wifi_command(wifi_command);
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_WIFI_CONNECTED, ESP8266_send_command(wifi_command));
}

void test_ESP8266_web_connection(void){
	char connection_command[256] = {0};
	char remote_ip[] = "ii1302-project-office-enviroment-monitor.eu-gb.mybluemix.net";
	char type[] = "TCP";
	char remote_port[] = "80";
	ESP8266_get_connection_command(connection_command, type, remote_ip, remote_port);
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_CONNECT, ESP8266_send_command(connection_command));
}

void test_ESP8266_web_request(void){
	char request[] = "GET /api/sensor HTTP/1.1\r\nHost: ii1302-project-office-enviroment-monitor.eu-gb.mybluemix.net\r\nConnection: close\r\n\r\n";
	int len = strlen (request);
	char init_send[len];
	sprintf(init_send, "%s%d\r\n", ESP8266_AT_SEND, len);
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_SEND_OK, ESP8266_send_command(init_send));
	TEST_ASSERT_EQUAL_STRING(ESP8266_AT_CLOSED, ESP8266_send_data(request));
}

void unit_test(void){

	/*TODO: make test function names more self explaining
	 	 	add tests together for init etc, or all that return "OK"?

	 	 	also add delays, esp does not always connect to wifi when commands are ran to fast
	 */

	init_uart_interrupt();
	UNITY_BEGIN();
	RUN_TEST(test_ESP8266_AT_RST);
	RUN_TEST(test_ESP8266_AT);
	RUN_TEST(test_ESP8266_AT_GMR);
	RUN_TEST(test_ESP8266_AT_CWMODE_1);
	RUN_TEST(test_ESP8266_AT_CWMODE_1_VERIFY);
	RUN_TEST(test_ESP8266_AT_CIPMUX_SET);
	RUN_TEST(test_ESP8266_CIPMUX_VERIFY);
	RUN_TEST(test_ESP8266_AT_CWQAP);
	HAL_Delay(2000);
	RUN_TEST(test_ESP8266_wifi_connect);
	RUN_TEST(test_ESP8266_AT_CWJAP_VERIFY);
	RUN_TEST(test_ESP8266_web_connection);
	/*TODO: make a function to handle the request data (see test function) */
	RUN_TEST(test_ESP8266_web_request);
	UNITY_END();
}


