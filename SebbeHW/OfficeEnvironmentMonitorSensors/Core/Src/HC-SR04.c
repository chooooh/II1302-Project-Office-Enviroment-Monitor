/*
 * ultrasonic.c
 *
 *  Created on: 26 apr. 2021
 *      Author: Sebastian Divander, sdiv@kth.se
 */

#include <gpio.h>
#include <stdbool.h>
#include <HC-SR04.h>
#include <tim.h>

_Bool HCSR04_01 = false;
_Bool HCSR04_02 = false;
_Bool Pulse_01 = false;
_Bool Pulse_02 = false;

uint32_t Tick_01;
uint32_t Tick_02;

void HCSR04_01_send_trigger(void)
{
HAL_GPIO_WritePin(Trigger1_GPIO_Port, Trigger1_Pin, GPIO_PIN_SET);
HAL_Delay(10);
HAL_GPIO_WritePin(Trigger1_GPIO_Port, Trigger1_Pin, GPIO_PIN_RESET);
HCSR04_01 = true;
}

void HCSR04_02_send_trigger(void)
{
HAL_GPIO_WritePin(Trigger2_GPIO_Port, Trigger2_Pin, GPIO_PIN_SET);
HAL_Delay(10);
HAL_GPIO_WritePin(Trigger2_GPIO_Port, Trigger2_Pin, GPIO_PIN_RESET);
HCSR04_02 = true;
}

void HCSR04_01_start_echotim(void)
{
	Tick_01 = 0;
	HAL_TIM_Base_Start_IT(&htim2);
}
void HCSR04_02_start_echotim(void)
{
	Tick_02 = 0;
	HAL_TIM_Base_Start_IT(&htim3);
}

float HCSR04_01_measure_distance(void)
{
	uint32_t time = Tick_01;
float distance = time/58;
return distance;
}

float HCSR04_02_measure_distance(void)
{
	uint32_t time = Tick_02;
float distance = time/58;
return distance;
}

void HCSR04_01_stop_echotim(void)
{
HAL_TIM_Base_Stop_IT(&htim2);
HCSR04_01 = false;
Pulse_01 = false;
}

void HCSR04_02_stop_echotim(void)
{
HAL_TIM_Base_Stop_IT(&htim3);
HCSR04_02 = false;
Pulse_02 = false;
}
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
	if (HCSR04_01 == true && Pulse_01 == true)
    HCSR04_01_stop_echotim();
	else if (HCSR04_01 == true && Pulse_01 == false)
	{
		HCSR04_01_start_echotim();
		Pulse_01 = true;
	}
	else if (HCSR04_02 == true && Pulse_02 == true)
		HCSR04_02_stop_echotim();
	else if (HCSR04_02 == true && Pulse_02 == false)
	{
		HCSR04_02_start_echotim();
	    Pulse_02 = true;
	}
}

void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
if (htim->Instance == TIM2)
{Tick_01++;}
else if (htim->Instance == TIM3)
{Tick_02++;}
}
