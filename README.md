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

```
First  Iteration:  employees = RENE
Second Iteration:  employees = ASTRID
Third  Iteration:  employees = CHRIS
Fourth Iteration:  employees = KATHY
Fifth  Iteration:  employees = RODRIGO
Sixth  Iteration:  employees = ELENA
```

## String schedules
Este string se produce luego del `split('=')` donde el segundo elemento del array se almacena en la variable schedules.

La operacion se hace en un bucle for por tanto este valor cambio por cada iteracion.

```
First  Iteration:  schedules = MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00
Second Iteration:  schedules = MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
Third  Iteration:  schedules = MO08:00-09:00,MO17:00-18:00,TU10:00-17:00,TH10:00-17:00,SA14:00-18:00,SU20:00-21:00
Fourth Iteration:  schedules = MO05:00-08:00,WE19:00-21:00,FR11:00-13:00,SU20:00-21:00
Fifth  Iteration:  schedules = MO05:00-08:00,WE19:00-21:00,FR11:00-13:00
Sixth  Iteration:  schedules = MO05:00-07:00,TU10:00-12:00,SA14:00-18:00,TH10:00-17:00,SU22:00-00:00
```

## Days Array

Aprovechando que schedule es una cadena podemos aplicar expresiones regulares para mediante un patron filtrar lo que necesitemos. La funcion getPattern toma como parametros un string y un patron, dicho patron lo elimina o lo convierte a un espacio vacio. El patron que se utiliza es `DELETE_SCHEDULES = /\d{2}:\d{2}-\d{2}:\d{2}/;` al borrar este parametro lo que queda es los dias separados por comas MO,TU,TH,SA,SU. Luego lo convertimos a array usando un split(',')

```
First  Iteration:  days = ["MO", "TU", "TH", "SA", "SU"]
Second Iteration:  days = ["MO", "TH", "SU"]
Third  Iteration:  days = ["MO", "MO", "TU", "TH", "SA", "SU"]
Fourth Iteration:  days = ["MO", "WE", "FR", "SU"]
Fifth  Iteration:  days = ["MO", "WE", "FR"]
Sixth  Iteration:  days = ["MO", "TU", "SA", "TH", "SU"]
```

## dailySchedule 

Esta variable almacena un string donde se elimina los dias MO,TU,WE,TH,FR,SA,SU  usando la funcion getPattern y la expresion regular `DELETE_DAYS = /[A-Z]/;` que basicamente filtra todas las letras mayusculas.

```
First  Iteration:  dailySchedule = 10:00-12:00,10:00-12:00,01:00-03:00,14:00-18:00,20:00-21:00
Second Iteration:  dailySchedule = 10:00-12:00,12:00-14:00,20:00-21:00
Third  Iteration:  dailySchedule = 08:00-09:00,17:00-18:00,10:00-17:00,10:00-17:00,14:00-18:00,20:00-21:00
Fourth Iteration:  dailySchedule = 05:00-08:00,19:00-21:00,11:00-13:00,20:00-21:00
Fifth  Iteration:  dailySchedule = 05:00-08:00,19:00-21:00,11:00-13:00
Sixth  Iteration:  dailySchedule = 05:00-07:00,10:00-12:00,14:00-18:00,10:00-17:00,22:00-00:00
```

## startHourAndMinute

Esta variable toma el primer tramo del horario es decir la parte antes del - , usando la funcion getPattern con la cadena dailySchedule y la expresion regular DELETE_CLOSING_HOUR = /-\d{2}:\d{2}/ como parametros.

```
First  Iteration:  startHourAndMinute = 10:00,10:00,01:00,14:00,20:00 
Second Iteration:  startHourAndMinute = 10:00,12:00,20:00
Third  Iteration:  startHourAndMinute = 08:00,17:00,10:00,10:00,14:00,20:00
Fourth Iteration:  startHourAndMinute = 05:00,19:00,11:00,20:00
Fifth  Iteration:  startHourAndMinute = 05:00,19:00,11:00
Sixth  Iteration:  startHourAndMinute = 05:00,10:00,14:00,10:00,22:00
```

## closingHourAndMinute

Esta variable toma el segundo tramo del horario es decir la parte despues del - , usando la funcion getPattern con la cadena dailySchedule y la expresion regular DELETE_START_HOUR = /\d{2}:\d{2}-/ como parametros.

```
First  Iteration:  closinHourAndMinute = 12:00,12:00,03:00,18:00,21:00
Second Iteration:  closinHourAndMinute = 12:00,14:00,21:00
Third  Iteration:  closinHourAndMinute = 09:00,18:00,17:00,17:00,18:00,21:00
Fourth Iteration:  closinHourAndMinute = 08:00,21:00,13:00,21:00
Fifth  Iteration:  closinHourAndMinute = 08:00,21:00,13:00
Sixth  Iteration:  closinHourAndMinute = 07:00,12:00,18:00,17:00,00:00
```

## startHour

Esta variable toma la primera parte de StartHourAndMinute es decir solamente la parte de la hora, para esto hace uso de la funcion getHour que toma como parametro la variable startHourAndMinute y retorna un array de numeros con valores de entre 0 a 23 que representan las horas.

```
First  Iteration:  startHour = [10, 10, 1, 14, 20]
Second Iteration:  startHour = [10, 12, 20]
Third  Iteration:  startHour = [8, 17, 10, 10, 14, 20]
Fourth Iteration:  startHour = [5, 19, 11, 20]
Fifth  Iteration:  startHour = [5, 19, 11]
Sixth  Iteration:  startHour = [5, 10, 14, 10, 22]
```

## startMinute

Esta variable toma la segunda parte de StartHourAndMinute es decir solamente la parte de los minutos, para esto hace uso de la funcion getMinute que toma como parametro la variable startHourAndMinute y retorna un array de numeros con valores de entre 0 a 59 que representan los minutos.

```
First  Iteration:  startMinute = [0, 0, 0, 0, 0]
Second Iteration:  startMinute = [0, 0, 0]
Third  Iteration:  startMinute = [0, 0, 0, 0, 0, 0]
Fourth Iteration:  startMinute = [0, 0, 0, 0]
Fifth  Iteration:  startMinute = [0, 0, 0]
Sixth  Iteration:  startMinute = [0, 0, 0, 0, 0]
```

## closingHour

Esta variable toma la primera parte de closingHourAndMinute es decir solamente la parte de la hora, para esto hace uso de la funcion getHour que toma como parametro la variable closingtHourAndMinute y retorna un array de numeros con valores de entre 0 a 23 que representan las horas.

```
First  Iteration:  closingHour = [12, 12, 3, 18, 21] 
Second Iteration:  closingHour = [12, 14, 21]
Third  Iteration:  closingHour = [9, 18, 17, 17, 18, 21]
Fourth Iteration:  closingHour = [8, 21, 13, 21]
Fifth  Iteration:  closingHour = [8, 21, 13]
Sixth  Iteration:  closingHour = [7, 12, 18, 17, 0]
```

## closingMinute

Esta variable toma la segunda parte de closingtHourAndMinute es decir solamente la parte de los minutos, para esto hace uso de la funcion getMinute que toma como parametro la variable closingHourAndMinute y retorna un array de numeros con valores de entre 0 a 59 que representan los minutos.

```
First  Iteration:  closingMinute = [0, 0, 0, 0, 0]
Second Iteration:  closingMinute = [0, 0, 0]
Third  Iteration:  closingMinute = [0, 0, 0, 0, 0, 0]
Fourth Iteration:  closingMinute = [0, 0, 0, 0]
Fifth  Iteration:  closingMinute = [0, 0, 0]
Sixth  Iteration:  closingMinute = [0, 0, 0, 0, 0]
```

## hourDifference

Obtiene un array que obtiene la resta entre los arreglos closingHour y startHour a traves de la funcion hourSubstraction

```
First  Iteration:  hourDifference = [2, 2, 2, 4, 1]
Second Iteration:  hourDifference = [2, 2, 1]
Third  Iteration:  hourDifference = [1, 1, 7, 7, 4, 1]
Fourth Iteration:  hourDifference = [3, 2, 2, 1]
Fifth  Iteration:  hourDifference = [3, 2, 2]
Sixth  Iteration:  hourDifference = [2, 2, 4, 7, 2]
```

## salaryRange

Obtiene un array con el valor que se paga por trabajar en cierto horario en cierto dia de la semana.

```
First  Iteration:  salaryRange = [15, 15, 25, 20, 25]
Second Iteration:  salaryRange = [15, 15, 25]
Third  Iteration:  salaryRange = [25, 15, 15, 15, 20, 25]
Fourth Iteration:  salaryRange = [25, 20, 15, 25]
Fifth  Iteration:  salaryRange = [25, 20, 15]
Sixth  Iteration:  salaryRange = [25, 15, 20, 15, 25]
```

## salary

Esta variable retorna un string con el salario que corresponde a cada usuario, se obtiene multiplicando los elementos de salaryRange y hourDifference con la funcion getSalary

```
First  Iteration:  salary = 215
Second Iteration:  salary =  85
Third  Iteration:  salary = 355
Fourth Iteration:  salary = 170
Fifth  Iteration:  salary = 145
Sixth  Iteration:  salary = 315
```




