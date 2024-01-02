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

    type BillingCalulated = {
        amount: number;
        whoPays: string;
        whoGets: string;
        forWhat: string
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
    const [nameOfActivityEditing, setNameOfActivityEditing] = React.useState("");
    const [amountOfActivityEditing, setAmountOfActivityEditing] = React.useState("");
    const [peopleForAmountEditing, setPeopleForAmountEditing] = React.useState<string[]>([]);
    const [personPaidEditing, setPersonPaidEditing] = React.useState("");

    //states
    const [personState, setPersonState] = React.useState(true);
    const [amountState, setAmountState] = React.useState(!personState);

    const handleAddPerson = (e: any) => {
        e.preventDefault();
        if (!name || people.includes(name)) return;
        people.push(name);
        setPeople(people);
        setName("");
    }

    const switchEditMode = (i: number, person: string) => {
        setPersonEditingValue(person);
        setEditMode(i);
    }

    const switchEditModeAmounts = (i: number, activity: string, recepients: string[], amount: string, personPaid: string) => {
        setNameOfActivityEditing(activity);
        setAmountOfActivityEditing(amount);
        setPeopleForAmountEditing(recepients);
        setPersonPaidEditing(personPaid);
        setEditMode(i);
    }

    const handleDeletePerson = (i: number) => {
        people.splice(i, 1);
        setPeople([...people]);
    }

    const handleDeleteAmount = (i: number) => {
        amounts.splice(i, 1);
        setAmounts([...amounts]);
    }

    const handleCancelEdit = () => {
        setEditMode(null);
    }

    const handleEditPerson = (e: any, i: number) => {
        e.preventDefault();
        if (!personEditingValue || people.includes(personEditingValue)) return;
        people.splice(i, 1);
        people.splice(i, 0, personEditingValue);
        setPeople([...people]);
        setPersonEditingValue("");
        setEditMode(null);
    }

    const handleEditAmount = (e: any, i: number) => {
        e.preventDefault();
        if (!nameOfActivityEditing) return;
        amounts.splice(i, 1);

        const amount = {
            amount: amountOfActivityEditing,
            nameOfAmount: nameOfActivityEditing,
            personPaid: personPaidEditing,
            peopleRecepients: peopleForAmountEditing
        } as unknown as Amount;

        amounts.splice(i, 0, amount);
        setAmounts([...amounts]);
        setNameOfActivityEditing("");
        setAmountOfActivityEditing("");
        setPeopleForAmountEditing([]);
        setPersonPaidEditing("");
        setEditMode(null);
    }

    const mystyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const mystyleEditing = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5px"
    };

    const handleAddPeopleForAmount = (event: any) => {
        const {
            target: { value },
        } = event;
        setPeopleForAmount(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleAddPeopleForAmountEditing = (event: any) => {
        const {
            target: { value },
        } = event;
        setPeopleForAmountEditing(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleAddPersonPaid = (event: any) => {
        setPersonPaid(event.target.value as string);
    };

    const handleAddPersonPaidEditing = (event: any) => {
        setPersonPaidEditing(event.target.value as string);
    };

    const handleAddRecords = (e: any) => {
        const amount = {
            amount: amountOfActivity,
            nameOfAmount: nameOfActivity,
            personPaid: personPaid,
            peopleRecepients: peopleForAmount
        } as unknown as Amount;

        e.preventDefault();
        if (!amount) return;
        amounts.push(amount);
        setAmounts(amounts);

        setNameOfActivity("");
        setAmountOfActivity("");
        setPeopleForAmount([]);
        setPersonPaid("");
    };

    const calculateEndingResult = () => {
        let billingCalulated = {} as unknown as BillingCalulated;
        let billings: BillingCalulated[] = [];

        amounts.forEach(amount => {
            amount.peopleRecepients.forEach(recepient => {
                billingCalulated = {
                    amount: amount.amount / amount.peopleRecepients.length,
                    whoGets: amount.personPaid,
                    whoPays: recepient,
                    forWhat: amount.nameOfAmount
                };
                billings.push(billingCalulated);
                billingCalulated = {} as unknown as BillingCalulated;
            });
        });

        billings.forEach((billing, i) => {
            const redundandAmount = billings.findIndex(x=>x.whoPays == billing.whoGets && x.whoGets == billing.whoPays);

            console.log(redundandAmount)
            if (redundandAmount != -1) {
                if (billings[redundandAmount].amount > billing.amount) {
                    const amountAbs = Math.abs(billing.amount - billings[redundandAmount].amount);
                    billings[redundandAmount].amount = amountAbs;
                } else {
                    billing.amount = billing.amount - billings[redundandAmount].amount;
                    billings.splice(i, 1);
                } 
            }
        });

        billings = billings.filter(x=>x.amount!=0);
        billings = billings.filter(x=>x.whoGets != x.whoPays);

        console.log(billings);
    }

    return (
        <>
            {personState ? <>
                <h1>Add meeting members</h1>
                <div style={mystyle}>
                    <form onSubmit={(e) => handleAddPerson(e)}>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            label="Unique Name"
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
                    onClick={() => { setPersonState(false); setAmountState(true) }}>Finish adding members</Button>
            </>
                :
                <> {amountState ? <>
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
                                type="number"
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
                                    {editModeIndex === i ? <form onSubmit={(e) => handleEditAmount(e, i)}>
                                        <div style={mystyleEditing}>
                                            <TextField
                                                size="small"
                                                id="outlined-basic"
                                                label="Name"
                                                variant="outlined"
                                                value={nameOfActivityEditing}
                                                onChange={(e) => { setNameOfActivityEditing(e.target.value) }}
                                            />
                                            <FormControl sx={{ ml: 1, mr: 1, width: 300 }}>
                                                <Select
                                                    labelId="demo-multiple-name-label"
                                                    id="demo-multiple-name"
                                                    size="small"
                                                    multiple
                                                    variant="outlined"
                                                    value={peopleForAmountEditing}
                                                    onChange={handleAddPeopleForAmountEditing}
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
                                                type="number"
                                                variant="outlined"
                                                value={+amountOfActivityEditing}
                                                onChange={(e) => { setAmountOfActivityEditing(e.target.value) }} />
                                            <FormControl sx={{ ml: 1, mr: 1, width: 200 }}>
                                                <Select
                                                    labelId="demo-name-label"
                                                    id="demo-name"
                                                    size="small"
                                                    variant="outlined"
                                                    value={personPaidEditing}
                                                    onChange={handleAddPersonPaidEditing}
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
                                        </div>
                                        <Button
                                            sx={{}}
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
                                                secondaryTypographyProps={{ style: { whiteSpace: "pre-line" } }}
                                                primary={amount.nameOfAmount}
                                                secondary={
                                                    "Amount: " + amount.amount + '\n' +
                                                    "Recepients: " + amount.peopleRecepients + '\n' +
                                                    "Person paid: " + amount.personPaid
                                                }
                                            />
                                            <Button
                                                sx={{ backgroundColor: 'grey' }}
                                                variant="contained"
                                                onClick={() => switchEditModeAmounts(i, amount.nameOfAmount, amount.peopleRecepients, amount.amount.toString(), amount.personPaid)}>Edit</Button>
                                            <Button
                                                sx={{ marginLeft: '10px', backgroundColor: '#d11f1f' }}
                                                variant="contained"
                                                type='button'
                                                onClick={() => handleDeleteAmount(i)}>Delete</Button>
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
                        onClick={() => { setAmountState(false); calculateEndingResult() }}>Finish adding amounts and count</Button>
                </>
                    : <>
                        <Button
                            sx={{ marginTop: '5px', marginLeft: '10px' }}
                            variant="contained"
                            type='button'
                            onClick={() => setAmountState(true)}>Edit amounts</Button>
                    </>}
                </>
            }
        </>
    );
}
