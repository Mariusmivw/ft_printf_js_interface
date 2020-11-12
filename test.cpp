#include <iostream>
#include <string>
extern "C" {
#include "../ft_printf/ft_printf.h"
}
using namespace std;

int main()
{
	cout << ft_printf("test\n") << endl;
}