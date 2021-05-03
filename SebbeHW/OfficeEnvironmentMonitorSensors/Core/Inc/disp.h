/*
 * disp.h
 *
 *  Created on: Apr 27, 2021
 *      Author: Sebastian Divander, sdiv@kth.se
 */

#ifndef INC_DISP_H_
#define INC_DISP_H_

#include "i2c.h"

typedef enum
{
	RED,
	BLUE,
	GREEN,
	BLACK,
	WHITE
} Display_ColourDef;

void display_init(void);
uint8_t command(uint8_t);
uint8_t data(uint8_t);
void draw_pixel(uint8_t, uint8_t, Display_ColourDef);
void reset(void);
void display_update(void);

#endif /* INC_DISP_H_ */
