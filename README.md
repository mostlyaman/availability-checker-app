# Availability Checker App
A simple demo app which lets clients book appointments with experts.

## Run locally
Clone the repository and then install dependencies.
```
git clone https://github.com/mostlyaman/availability-checker-app.git
cd availability-checker-app
npm i 
```
Install json-server globally and start it at port 3000.
```
npm i -g json-server
json-server --watch db.json
```
Start the project.
```
npm run dev
```
### Register a Expert
Choose a name for a expert and enter his work timings. The expert will get registered on the server and will be visible to all clients.

### Book a expert
After logging out as a expert, enter a name for a client and log in. All expert will be visible and you can book a appointment in any of the visible available slot.

After booking an appointment, the app will update the available timings for the expert.

### See Booked appointments as an Expert
Logout and again login as the prevous expert. You will be able to see and cancel any booked appointements.
