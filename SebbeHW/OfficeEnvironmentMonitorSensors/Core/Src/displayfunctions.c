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

//Define Initialization instructions
#define INSTR1 0xA8
#define INSTR2 0x20
#define INSTR3 0x00
#define INSTR4 0xB0
#define INSTR5 0xC8
#define INSTR6 0x00
#define INSTR7 0x10
#define INSTR8 0x40
#define INSTR9 0x81
#define INSTR10 0xFF
#define INSTR11 0xA1
#define INSTR12 0xA6
#define INSTR13 0xA8
#define INSTR14 63
#define INSTR15 0xA4
#define INSTR16 0xD3
#define INSTR17 0x00
#define INSTR18 0xD5
#define INSTR19 0xF0
#define INSTR20 0xD9
#define INSTR21 0x22
#define INSTR22 0xDA
#define INSTR23 0x32
#define INSTR24 0xDB
#define INSTR25 0x20
#define INSTR26 0x8D
#define INSTR27 0x14
#define INSTR28 0xAF

//I2C transfer defines
#define COMMAND_MODE 0x00
#define DATA_MODE 0x40

//display defines
#define H 128
#define W 64
#define BUFFERSIZE 1024

//screen buffer
static uint8_t buffer[BUFFERSIZE];

void display_init(void)
{
	HAL_Delay(100);

uint8_t status;
uint8_t instr;

instr = INSTR1;
if ((status = command(instr)) != 0)
reset();

instr = INSTR2;
if ((status = command(instr)) != 0)
reset();

instr = INSTR3;
if ((status = command(instr)) != 0)
reset();

instr = INSTR4;
if ((status = command(instr)) != 0)
reset();

instr = INSTR5;
if ((status = command(instr)) != 0)
reset();

instr = INSTR6;
if ((status = command(instr)) != 0)
reset();

instr = INSTR7;
if ((status = command(instr)) != 0)
reset();

instr = INSTR8;
if ((status = command(instr)) != 0)
reset();

instr = INSTR9;
if ((status = command(instr)) != 0)
reset();

instr = INSTR10;
if ((status = command(instr)) != 0)
reset();

instr = INSTR11;
if ((status = command(instr)) != 0)
reset();

instr = INSTR12;
if ((status = command(instr)) != 0)
reset();

instr = INSTR13;
if ((status = command(instr)) != 0)
reset();

instr = INSTR14;
if ((status = command(instr)) != 0)
reset();

instr = INSTR15;
if ((status = command(instr)) != 0)
reset();

instr = INSTR16;
if ((status = command(instr)) != 0)
reset();

instr = INSTR17;
if ((status = command(instr)) != 0)
reset();

instr = INSTR18;
if ((status = command(instr)) != 0)
reset();

instr = INSTR19;
if ((status = command(instr)) != 0)
reset();

instr = INSTR20;
if ((status = command(instr)) != 0)
reset();

instr = INSTR21;
if ((status = command(instr)) != 0)
reset();

instr = INSTR22;
if ((status = command(instr)) != 0)
reset();

instr = INSTR23;
if ((status = command(instr)) != 0)
reset();

instr = INSTR24;
if ((status = command(instr)) != 0)
reset();

instr = INSTR25;
if ((status = command(instr)) != 0)
reset();

instr = INSTR26;
if ((status = command(instr)) != 0)
reset();

instr = INSTR27;
if ((status = command(instr)) != 0)
reset();

instr = INSTR28;
if ((status = command(instr)) != 0)
reset();

}
uint8_t command(uint8_t command)
{
	/*
	uint8_t send[2];
	send[0] = COMMAND_MODE;
	send[1] = command;
	*/
HAL_StatusTypeDef status;
status = HAL_I2C_Mem_Write(&hi2c2, DISPLAY_ADDR, COMMAND_MODE, 8, &command, 8, 10);

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
	status = HAL_I2C_Mem_Write(&hi2c2, DISPLAY_ADDR, DATA_MODE, 8, &data, 8, 10);

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

	HAL_I2C_Mem_Write(&hi2c2, DISPLAY_ADDR, DATA_MODE, &buffer, 1024, W, 10);
}
}

