SOFTWARE DEVELOPMENT
A furniture company sales department asks for the creation of a software which allows them to identify
the closest warehouse according to an address provided. This is the key function of the software given
that, currently, deliveries are executed from a random warehouse, resulting in additional expenses and
unnecessary delays.

Requirements:
1. Development
1. Login/Logout.
2. Roles and grants: Only manager users can access the function: “Calculate the closest
warehouse”.

3. Home Page:
a. It should display a warehouse grid.
i. Grid fields: Code, Name, Address, State, County, Zip, download button,
(downloads list of products) Delete button (deletes warehouse).
ii. There should be a “New” button to create a new warehouse below the grid.

1. The “New” button opens a new form to enter a new warehouse.
2. The form should have a “Select List” button to choose the file to be
uploaded once the new warehouse is saved.
3. The form should contain the following fields:
a. Code (required)
b. Name (required)
c. Address (required)
d. State (required)
e. County
f. Zip

4. The form should have a “Save” button that allows to save the
warehouse. It should be validated that another warehouse with the
same code doesn’t already exist.

5. After saving a warehouse, the system should redirect to “Home page”,
and simultaneously, a message should appear confirming that the
warehouse was successfully created, and the grid must show the new
warehouse.


4. Nearest warehouse calculation
a. There must be a function which allows to enter an address and, after pressing a button,
a map is displayed showing the provided address and the three closest warehouses
highlighted with numbers 1, 2 and 3 according to closeness. It is also required to provide
the shortest route towards the provided address for the closest warehouse.
5. Take into consideration that in the upcoming future, both a mobile application and an external
service will utilize this solution for authentication purposes.

2. Work Estimate


2. Work Estimate
1. The first requirement is to submit a list of the tasks to be executed as part of the development
and an estimate expressed in hours for each of them, so we can know the total amount of hours
required to perform the task. The deadline for the development should also be informed.
2. The above-mentioned estimate should be submitted within two days. (Compliance with this
requirement is also part of the technical test).
The presentation of this project will be performed through an interview in which the created code
must be shown together with the functioning website.