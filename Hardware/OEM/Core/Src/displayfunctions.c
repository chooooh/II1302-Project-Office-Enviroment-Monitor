/*
 * displayfunctions.c
 *
 *  Created on: Apr 27, 2021
 *      Author: Sebastian Divander,       sdiv@kth.se
 *              Jonatan Lundqvist Silins, jonls@kth.se
 */

#include "disp.h"
#include "i2c.h"
#include "fonts.h"
#include "stdio.h"

//Define write and read device address
#define DISPLAY_ADDR 0x78

//I2C transfer defines
#define COMMAND_MODE 0x00
#define DATA_MODE 0x40

//Screen object - used for information about mostly the display buffer
static Display_t display;

//screen buffer
static uint8_t buffer[BUFFERSIZE];

//initialization array - all commands used in initializing the display are stored in this array
uint8_t instruct[28] = {0xAE, 0x20, 0x10, 0xB0, 0xC8, 0x00, 0x10, 0x40, 0x81, 0xFF, 0xA1, 0xA6, 0xA8, 63, 0xA4,
		                0xD3, 0x00, 0xD5, 0xF0, 0xD9, 0x22, 0xDA, 0x12, 0xDB, 0x20, 0x8D, 0x14, 0xAF};

/**
 * @brief get the current y coordinate for canvas
 *
 * @param none
 * @retval y coordinate
 */
uint16_t
display_get_y(void){
	return display.thisY;
}

/**
 * @brief get the current x coordinate for canvas
 *
 * @param none
 * @retval x coordinate
 */
uint16_t
display_get_x(void){
	return display.thisY;
}

/**
 * @brief a function for initializing the display with the recommended initialization sequence
 *
 * @param none
 * @retval none
 */
void display_init(void)
{
	HAL_Delay(100);

	uint8_t status = 0;

	for (int i = 0; i < 28; i++)
		status += command(instruct[i]);

	/* Init failed, try again */
	if (status > 0)
	{
		HAL_Delay(1000);

		/* blink here to indicate that we have to try again */

		retry();
	}

	reset_screen_canvas();

	display.thisX = 0;
	display.thisY = 0;

}

/**
 * @brief a function to send commands to the display
 *
 * @param command - the command the user wishes to send
 * @retval status - status codes for the I2C transmission
 */
uint8_t command(uint8_t command)
{
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

	return 3; // something else than ok, error, timeout...
}


/**
 * @brief a function that fills the screen with black pixels (our only known way of "reseting" it) and then reseting the buffer position
 *
 * @param none
 * @retval none
 */
void reset_screen_canvas(void)
{
	Display_ColourDef colour = BLACK;
	for (int i = 0; i < sizeof(buffer); i++)
		buffer[i] = (colour == BLACK) ? 0x00 : 0xFF;

	HAL_Delay(10);
	display_update();
	display_set_position(1,1);
	for(uint16_t j = 0; j < BUFFERSIZE; j++)
		buffer[j] = 0;
}

/**
 * @brief a function prompting the display to retry initialization after an I2C error has been detected
 *
 * @param none
 * @retval none
 */
void retry(void)
{
	display_init();
}

/**
 * @brief draw a pixel in the screen buffer
 * @note DO NOT USE STANDALONE, THIS FUNCTION IS ONLY MEANT FOR USE IN OTHER FUNCTIONS
 * @param h pixel location on h height of the display
 * @param w pixel location on w width of the display
 * @param colour Colour of the pixel
 *
 * @retval none
 *
 */
void draw_pixel(uint8_t w, uint8_t h, Display_ColourDef colour)
{

	if (h >= H || w >= W)
	{
		printf("Outside of screen buffer");
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

/**
 * @brief a function for updating the contents of the display, from the display buffer
 *
 * @param none
 * @retval none
 */
void display_update(void)
{
	uint8_t status;
	for(uint8_t i = 0; i < 8; i++)
	{
		status +=	command(0xB0 + i);
		status +=	command(0x00);
		status +=	command(0x10);

		HAL_I2C_Mem_Write(&hi2c2, DISPLAY_ADDR, DATA_MODE, 1, &buffer[W * i], W, HAL_MAX_DELAY);
	}
}

/**
 * @brief a function for writing a single char on the display
 * @note If you can, please only use the "display_write_string"-function as this function is mainly a foundation for that function
 *
 * @param c - the character to be printed
 * @param Font - the character font to be used to construct the character in the display buffer
 * @param colour - the selected colour that the character will be printed out in
 *
 * @retval none
 */
void display_write_char(char c, FontDef Font, Display_ColourDef colour)
{
	uint32_t i, j, k;

	if (W <= (display.thisX + Font.FontWidth) || H <= (display.thisY + Font.FontHeight))
		return;


	for (i = 0; i < Font.FontHeight; i++)
	{
		k = Font.data[(c-32) * Font.FontHeight + i];
		for (j = 0; j < Font.FontWidth; j++)
		{
			if ((k << j) & 0x8000)
				draw_pixel((display.thisX + j), (display.thisY + i), (Display_ColourDef) colour);
			else
				draw_pixel((display.thisX + j), (display.thisY + i), (Display_ColourDef)!colour);
		}
	}
	display.thisX += Font.FontWidth;
}

/**
 * @brief a function for writing strings on the display
 *
 * @param *str - the char pointer to the string to be printed
 * @param colour - the colour the string should be printed in
 *
 * @retval none
 */
void display_write_string(const char *str, Display_ColourDef colour)
{
	uint8_t char_counter = 0;
	uint8_t row_counter = 0;

	while (*str != 0)
	{
		display_write_char(*str, Font_7x10, colour);
		char_counter++;
		if (char_counter == MAX_CHARS)
		{
			row_counter++;
			if (row_counter > MAX_ROWS)
			{
				display_error_message();
				return;
			}
			else
			{
				display_set_position(1, (display.thisY + ROW_SIZE));
				char_counter = 0;
			}
		}
		str++;
	}
		display_update();
}

/**
 * @brief a function for displaying error messages on the display
 *
 * @param none
 * @retval none
 */
void display_error_message(void)
{
	reset_screen_canvas();
	HAL_Delay(100);
	display_write_string("String too large! Please shorten it", WHITE);
    HAL_Delay(100);
}

/**
 * @brief a function for setting the current position in the screen buffer
 *
 * @param x - the x position the user wishes to set the current X-position to
 * @param y - the y position the user wishes to set the current Y-position to
 *
 * @retval
 */
void display_set_position(uint16_t x, uint16_t y)
{
	display.thisX = x;
	display.thisY = y;
}
