import { app } from "./start";


/**
* App Variables
*/


const PORT : number = 8000;


/**
* Server Activation
*/


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
