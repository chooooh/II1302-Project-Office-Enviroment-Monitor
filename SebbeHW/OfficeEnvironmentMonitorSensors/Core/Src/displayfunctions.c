/*
 * displayfunctions.c
 *
 *  Created on: Apr 27, 2021
 *      Author: Sebastian Divander, sdiv@kth.se
 */

#include "disp.h"
#include "i2c.h"

//Define write and read device addresses
#define DISPLAY_ADDR 0x78
//#define DISPLAY_ADDR_WRITE 0x78
//#define DISPLAY_ADDR_READ 0x79

//I2C transfer defines
#define COMMAND_MODE 0x00
#define DATA_MODE 0x40

//display defines
#define H 128
#define W 64
#define BUFFERSIZE 1024

//screen buffer
static uint8_t buffer[BUFFERSIZE];

uint8_t instruct[28] = {0xA8, 0x20, 0x00, 0xB0, 0xC8, 0x00, 0x10, 0x40, 0x81, 0xFF, 0xA1, 0xA6, 0xA8, 63, 0xA4,
		                0xD3, 0x00, 0xD5, 0xF0, 0xD9, 0x22, 0xDA, 0x32, 0xDB, 0x20, 0x8D, 0x14, 0xAF};

void display_init(void)
{
	HAL_Delay(100);

uint8_t status = 0;

for (int i = 0; i < 28; i++)
{
status += command(instruct[i]);
}
if (status > 0)
{
	HAL_Delay(1000);
	reset();
}

}
uint8_t command(uint8_t command)
{
	/*
	uint8_t send[2];
	send[0] = COMMAND_MODE;
	send[1] = command;
	*/
HAL_StatusTypeDef status;
status = HAL_I2C_Mem_Write(&hi2c2, DISPLAY_ADDR, COMMAND_MODE, I2C_MEMADD_SIZE_8BIT, &command, 1, HAL_MAX_DELAY);

if (status == HAL_OK)
{
	return 0;
}
if (status == HAL_ERROR)
{
	return 1;
}
if (status == HAL_TIMEOUT)
{
	return 2;
}
}

uint8_t data(uint8_t data)
{
	/*
	uint8_t send[2];
	send[0] = DATA_MODE;
	send[1] = data;
	*/
	HAL_StatusTypeDef status;
	status = HAL_I2C_Mem_Write(&hi2c2, DISPLAY_ADDR, COMMAND_MODE, I2C_MEMADD_SIZE_8BIT, &data, 1, HAL_MAX_DELAY);

	if (status == HAL_OK)
	{
		return 0;
	}
	if (status == HAL_ERROR)
	{
		return 1;
	}
	if (status == HAL_TIMEOUT)
	{
		return 2;
	}
}

void reset(void)
{
display_init();
}

void draw_pixel(uint8_t h, uint8_t w, Display_ColourDef colour)
{

if (h >= H || w >= H)
{
//	sprintf("Outside of screen buffer");
	return;
}

if (colour == WHITE)
{
	buffer[w + (h/8) * W] |= 1 << (h % 8);
}
else
{
	buffer[w + (h/8) * W] &= ~(1 << (h % 8));
}
}

void display_update(void)
{
for(uint8_t i = 0; i < 8; i++)
{
	command(0xB0 + i);
	command(0x00);
	command(0x10);

	HAL_I2C_Mem_Write(&hi2c2, DISPLAY_ADDR, DATA_MODE, 8, &buffer, W, 10);
}
}

