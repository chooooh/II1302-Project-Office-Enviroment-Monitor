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
	TEST_ASSERT_EQUAL_STRING("OK", uart_send(ESP8266_AT_RST));
}

void test_ESP8266_AT(void){
	TEST_ASSERT_EQUAL_STRING("OK", uart_send(ESP8266_AT));
}

void test_ESP8266_AT_GMR(void){
	TEST_ASSERT_EQUAL_STRING("OK", uart_send(ESP8266_AT_GMR));
}

void test_ESP8266_AT_CWQAP(void){
	TEST_ASSERT_EQUAL_STRING("OK", uart_send(ESP8266_AT_CWQAP));
}

void test_ESP8266_AT_CWMODE_1(void){
	TEST_ASSERT_EQUAL_STRING("OK", uart_send(ESP8266_AT_CWMODE_STATION_MODE));
}

void test_ESP8266_AT_CWMODE_1_VERIFY(void){
	TEST_ASSERT_EQUAL_STRING("CWMODE:1", uart_send(ESP8266_AT_CWMODE_TEST));
}

void test_ESP8266_AT_CWJAP_SET(void){
	char buffer[256] = {0};
	ESP8266_get_cwjap_command(buffer);
	TEST_ASSERT_EQUAL_STRING("OK", uart_send(buffer));
}

void test_ESP8266_AT_CWJAP_VERIFY(void){
	TEST_ASSERT_EQUAL_STRING("NO AP", uart_send(ESP8266_AT_CWJAP_TEST));
	//TEST_ASSERT_EQUAL_STRING("CONNECTED", uart_send(ESP8266_AT_CWJAP_TEST, connection_status));
}

void test_ESP8266_AT_CIPMUX_SET(void){
	TEST_ASSERT_EQUAL_STRING("OK", uart_send(ESP8266_AT_CIPMUX));
}

void test_ESP8266_CIPMUX_VERIFY(void){
	TEST_ASSERT_EQUAL_STRING("CIPMUX:0", uart_send(ESP8266_AT_CIPMUX_TEST));
}

void unit_test(void){

	init_uart_interrupt();
	UNITY_BEGIN();
	RUN_TEST(test_ESP8266_AT_RST);
	RUN_TEST(test_ESP8266_AT);
	RUN_TEST(test_ESP8266_AT_GMR);
	RUN_TEST(test_ESP8266_AT_CWMODE_1);
	RUN_TEST(test_ESP8266_AT_CWMODE_1_VERIFY);
	//RUN_TEST(test_ESP8266_AT_CWJAP_SET);
	RUN_TEST(test_ESP8266_AT_CWQAP);
	RUN_TEST(test_ESP8266_AT_CWJAP_VERIFY);
	RUN_TEST(test_ESP8266_AT_CIPMUX_SET);
	RUN_TEST(test_ESP8266_CIPMUX_VERIFY);

	UNITY_END();



	//ESP8266_send_command(ESP8266_AT, full);
	//ESP8266_send_command(ESP8266_AT_GMR, full);
	//ESP8266_send_command(ESP8266_AT_CWMODE_TEST, full);
//	ESP8266_send_command(ESP8266_AT_CWMODE_STATION_MODE, full);
//	ESP8266_send_command("AT+CWDHCP_CUR?\r\n", full);
	//ESP8266_send_command("AT+CWLAP\r\n", full);
	//ESP8266_send_command(ESP8266_AT_CWJAP_TEST, full);
/*
	uart_send(ESP8266_AT_RST);
		uart_send(ESP8266_AT);
		uart_send(ESP8266_AT_CWMODE_TEST);
		uart_send("AT+CWLAP\r\n");
		uart_send(ESP8266_AT_CWQAP);
	//uart_send(ESP8266_AT_CWQAP, connection_status);
		uart_send(ESP8266_AT_CWJAP_TEST);
	*/
}


