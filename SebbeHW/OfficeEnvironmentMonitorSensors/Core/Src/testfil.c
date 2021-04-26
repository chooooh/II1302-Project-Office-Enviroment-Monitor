/*
 * testfil.c
 *
 *  Created on: 21 apr. 2021
 *      Author: Sebastian Divander, sdiv@kth.se
 */

#include "unity.h"
#include "lsf.h"
#include "testfil.h"

void setUp(void)
{}

void tearDown(void)
{}

void unit_test(void)
{
	setUp();

	UNITY_BEGIN();
	//Enviromental snesor-tests
    RUN_TEST(test_lsf_start);
	RUN_TEST(test_lsf_data_recv);

	//Ultrasound distance sensor-tests
	RUN_TEST(test_hc04_start_01);
	RUN_TEST(test_hc04_start_02);

	RUN_TEST(test_hc04_measure_01);
	RUN_TEST(test_hc04_measure_02);

	//Buzzer-tests
	RUN_TEST(test_buzzer_start);
	RUN_TEST(test_buzzer_sound);
    UNITY_END();

    tearDown();
}

void test_lsf_start(void)
{TEST_ASSERT_EQUAL_UINT8(0, initialize_sensor());}

void test_lsf_data_recv(void)
{}

void test_hc04_start_01(void)
{}

void test_hc04_start_02(void)
{}

void test_hc04_measure_01(void)
{}

void test_hc04_measure_02(void)
{}

void test_buzzer_start(void)
{}

void test_buzzer_sound(void)
{}
