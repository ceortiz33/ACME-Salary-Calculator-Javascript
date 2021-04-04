# ACME-Salary-Calculator-Javascript

Exercise

The company ACME offers their employees the flexibility to work the hours they want. They will pay for the hours worked based on the day of the week and time of day, according to the following table:

Monday - Friday

00:01 - 09:00 25 USD

09:01 - 18:00 15 USD

18:01 - 00:00 20 USD

Saturday and Sunday

00:01 - 09:00 30 USD

09:01 - 18:00 20 USD

18:01 - 00:00 25 USD

The goal of this exercise is to calculate the total that the company has to pay an employee, based on the hours they worked and the times during which they worked. The following abbreviations will be used for entering data:

MO: Monday

TU: Tuesday

WE: Wednesday

TH: Thursday

FR: Friday

SA: Saturday

SU: Sunday

Input: the name of an employee and the schedule they worked, indicating the time and hours. This should be a .txt file with at least five sets of data. You can include the data from our two examples below.

Output: indicate how much the employee has to be paid

For example:

Case 1:

INPUT

RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00

OUTPUT:

The amount to pay RENE is: 215 USD

Case 2:

INPUT

ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00

OUTPUT:

The amount to pay ASTRID is: 85 USD

Once you have finished the exercise, please upload the solution to GitHub and send us the link.OK
Don’t forget to include a README.md file. Your README should include an overview of your solution, an explanation of your architecture, an explanation of your approach and methodology and instructions how to run the program locally.

I used `FileReader()` API to read the content of the textfile. This file contains the data of the employee and their schedules.

The first thing to do is to get the content of the text file in a variable. The variable reader uses the property `onload` of FileReader lo siguiente que hay que hacer es obtener un array donde cada elemento represente a un empleado con su respectivo horario,
usamos split para esto.

A continuacion realizamos un bucle for para recorrer cada elemento del array, dentro de ese array tenemos que separar cada campo de la cadena, aqui aprovechandose de expresiones regulares. La cadena tiene un igual que separa dos campos empleados y los horarios, se hace un split nuevamente y almacenamos cada el primer campo en el array employees y el segundo array en schedules.

Dejamos de lado por un momento el array employees y nos concentramos en el array schedules. Como siguiente paso hay que obtener el dia y el array de horarios esto lo hacemos usando expresiones regulares. days se obtiene aplicando la funcion  getPattern que toma como parametro una cadena y un patron y lo reemplaza por espacio vacio. Tambien aplicamos un trim() para evitar que posibles caracteres como espacios se tomen en consideracion en el array days.

## String Employees
Este string se produce luego del `split('=')` donde el primer elemento del array se almacena en la variable employees.

La operacion se hace en un bucle for por tanto este valor cambio por cada iteracion.

Primera Iteracion:  employees = RENE
Segunda Iteracion:  employees = ASTRID
Tercera Iteracion:  employees = CHRIS
Cuarta Iteracion:   employees = KATHY
Quinta Iteracion:   employees = RODRIGO
Sexta Iteracion:    employees = ELENA

## String schedules
Este array se produce luego del `split('=')` dando como resultado dos elementos, el segundo elemento corresponde a los horarios.

## Modifying Schedules Array

Sched











