import { Button, Container, Divider, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, TextField, Theme, useTheme } from '@mui/material';
import * as React from 'react';

export default function DeptCalulator() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    const theme = useTheme();

    type Amount = {
        peopleRecepients: string[],
        personPaid: string,
        nameOfAmount: string,
        amount: number
    }

    //people
    const [name, setName] = React.useState("");
    const [personEditingValue, setPersonEditingValue] = React.useState("");
    const [editModeIndex, setEditMode] = React.useState<number | null>();
    const [people, setPeople] = React.useState<string[]>([]);

    //amounts
    const [nameOfActivity, setNameOfActivity] = React.useState("");
    const [amountOfActivity, setAmountOfActivity] = React.useState("");
    const [peopleForAmount, setPeopleForAmount] = React.useState<string[]>([]);
    const [personPaid, setPersonPaid] = React.useState("");
    const [amounts, setAmounts] = React.useState<Amount[]>([]);

    //states
    const [personState, setPersonState] = React.useState(true);
    const [amountState, setAmountState] = React.useState(!personState);

    const handleAddPerson = (e: any) => {
        e.preventDefault();
        if (!name) return;
        people.push(name);
        setPeople(people);
        setName("");
    }

    const switchEditMode = (i: number, person: string) => {
        setPersonEditingValue(person);
        setEditMode(i);
    }

    const handleDeletePerson = (i: number) => {
        people.splice(i, 1);
        setPeople([...people]);
    }

    const handleCancelEdit = () => {
        setEditMode(null);
    }

    const handleEditPerson = (e: any, i: number) => {
        e.preventDefault();
        if (!personEditingValue) return;
        people.splice(i, 1);
        people.splice(i, 0, personEditingValue);
        setPeople([...people]);
        setPersonEditingValue("");
        setEditMode(null);
    }

    const mystyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const handleAddPeopleForAmount = (event: any) => {
        const {
            target: { value },
        } = event;
        setPeopleForAmount(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleAddPersonPaid = (event: any) => {
        setPersonPaid(event.target.value as string);
    };

    const handleAddRecords = (e: any) => {
        const amount = { 
            amount: amountOfActivity, 
            nameOfAmount: nameOfActivity, 
            personPaid: personPaid, 
            peopleRecepients: peopleForAmount} as unknown as Amount;

        e.preventDefault();
        if (!amount) return;
        amounts.push(amount);
        setAmounts(amounts);

        setNameOfActivity("");
        setAmountOfActivity("");
    };

    return (
        <>
            {personState ? <>
                <h1>Add meeting members</h1>
                <div style={mystyle}>
                    <form onSubmit={(e) => handleAddPerson(e)}>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                        <Button
                            sx={{ marginLeft: '10px' }}
                            variant="contained"
                            type='submit'>Add member</Button>
                    </form>
                </div>
                <Container maxWidth="sm">
                    <List aria-label="mailbox folders">
                        {people.map((person, i) => {
                            return <ListItem divider>
                                {editModeIndex === i ? <form onSubmit={(e) => handleEditPerson(e, i)}>
                                    <TextField
                                        size="small"
                                        id="outlined-basic"
                                        label="Name"
                                        variant="outlined"
                                        value={personEditingValue}
                                        onChange={(e) => { setPersonEditingValue(e.target.value) }}
                                    />
                                    <Button
                                        sx={{ marginLeft: '10px' }}
                                        variant="contained"
                                        type='submit'>Confirm edit</Button>
                                    <Button
                                        sx={{ marginLeft: '10px', backgroundColor: '#d11f1f' }}
                                        variant="contained"
                                        type='button'
                                        onClick={() => handleCancelEdit()}>Cancel edit</Button>
                                </form> :
                                    <>
                                        <ListItemText primary={person} />
                                        <Button
                                            sx={{ marginLeft: '10px', backgroundColor: 'grey' }}
                                            variant="contained"
                                            onClick={() => switchEditMode(i, person)}>Edit</Button>
                                        <Button
                                            sx={{ marginLeft: '10px', backgroundColor: '#d11f1f' }}
                                            variant="contained"
                                            type='button'
                                            onClick={() => handleDeletePerson(i)}>Delete</Button>
                                    </>
                                }
                                <Divider light />
                            </ListItem>;
                        })}
                    </List>
                </Container>
                <Button
                    sx={{ marginLeft: '10px' }}
                    variant="contained"
                    type='button'
                    onClick={() => setPersonState(false)}>Finish adding members</Button>
            </>
                :
                <>
                    <Button
                        sx={{ marginTop: '5px', marginLeft: '10px' }}
                        variant="contained"
                        type='button'
                        onClick={() => setPersonState(true)}>Edit members</Button>
                    <h1>Add amounts and recepients</h1>
                    <div style={mystyle}>
                        <form onSubmit={(e) => handleAddRecords(e)}>
                            <TextField
                                size="small"
                                id="outlined-basic"
                                label="Name of activity"
                                variant="outlined"
                                value={nameOfActivity}
                                onChange={(e) => { setNameOfActivity(e.target.value) }} />
                            <FormControl sx={{ ml: 1, mr: 1, width: 300 }}>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    size="small"
                                    multiple
                                    variant="outlined"
                                    value={peopleForAmount}
                                    onChange={handleAddPeopleForAmount}
                                    MenuProps={MenuProps}
                                >
                                    {people.map((person) => (
                                        <MenuItem
                                            key={person}
                                            value={person}
                                        >
                                            {person}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                size="small"
                                id="outlined-basic"
                                label="Cost of activity"
                                variant="outlined"
                                value={amountOfActivity}
                                onChange={(e) => { setAmountOfActivity(e.target.value) }} />
                            <FormControl sx={{ ml: 1, mr: 1, width: 200 }}>
                                <Select
                                    labelId="demo-name-label"
                                    id="demo-name"
                                    size="small"
                                    variant="outlined"
                                    value={personPaid}
                                    onChange={handleAddPersonPaid}
                                >
                                    {people.map((person) => (
                                        <MenuItem
                                            key={person}
                                            value={person}
                                        >
                                            {person}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                sx={{ marginLeft: '10px' }}
                                variant="contained"
                                type='submit'>Add record</Button>
                        </form>
                    </div>
                    <Container maxWidth="sm">
                        <List aria-label="mailbox folders">
                            {amounts.map((amount, i) => {
                                return <ListItem divider>
                                    {editModeIndex === i ? <form onSubmit={(e) => handleEditPerson(e, i)}>
                                        <TextField
                                            size="small"
                                            id="outlined-basic"
                                            label="Name"
                                            variant="outlined"
                                            value={personEditingValue}
                                            onChange={(e) => { setPersonEditingValue(e.target.value) }}
                                        />
                                        <Button
                                            sx={{ marginLeft: '10px' }}
                                            variant="contained"
                                            type='submit'>Confirm edit</Button>
                                        <Button
                                            sx={{ marginLeft: '10px', backgroundColor: '#d11f1f' }}
                                            variant="contained"
                                            type='button'
                                            onClick={() => handleCancelEdit()}>Cancel edit</Button>
                                    </form> :
                                        <>
                                            <ListItemText 
                                            secondaryTypographyProps={{ style: {  whiteSpace: "pre-line" } }} 
                                            primary={amount.nameOfAmount} 
                                            secondary={
                                                "Amount: " + amount.amount + '\n' +
                                                "Recepients: " + amount.peopleRecepients + '\n' +
                                                "Person paid: " + amount.personPaid
                                            } 
                                            />
                                            <Button
                                                sx={{ marginLeft: '10px', backgroundColor: 'grey' }}
                                                variant="contained"
                                                onClick={() => switchEditMode(i, amount.nameOfAmount)}>Edit</Button>
                                            <Button
                                                sx={{ marginLeft: '10px', backgroundColor: '#d11f1f' }}
                                                variant="contained"
                                                type='button'
                                                onClick={() => handleDeletePerson(i)}>Delete</Button>
                                        </>
                                    }
                                    <Divider light />
                                </ListItem>;
                            })}
                        </List>
                    </Container>
                    <Button
                    sx={{ marginLeft: '10px' }}
                    variant="contained"
                    type='button'
                    onClick={() => setPersonState(false)}>Finish adding amounts</Button>
                </>
            }
        </>
    );
}
