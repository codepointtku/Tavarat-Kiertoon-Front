import { useState, useEffect } from 'react';
import { useFetcher, Link } from 'react-router-dom';
import {
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    Input,
    Button,
    Typography,
    Grid,
    Stack,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    name: string;
    id: number & string;
    count: number;
    maxCount: number;
    amountChangeState: {
        unconfirmedChangesCartProducts: object[];
        setUnconfirmedChangesCartProducts: React.Dispatch<React.SetStateAction<object[]>>;
    };
}

function ProductInCart({ name, id, count, maxCount, amountChangeState }: Props) {
    const fetcher = useFetcher();
    const [changeAmount, setChangeAmount] = useState(true);
    const [amountN, setAmountN] = useState(count);
    const [selectedAmount, setSelectedAmount] = useState(count);
    const { unconfirmedChangesCartProducts, setUnconfirmedChangesCartProducts } = amountChangeState;

    useEffect(() => {
        if (changeAmount) {
            unconfirmedChangesCartProducts.includes(id) &&
                setUnconfirmedChangesCartProducts((changes) => changes.filter((item) => item !== id));
        }
        if (!changeAmount) {
            !unconfirmedChangesCartProducts.includes(id) &&
                setUnconfirmedChangesCartProducts((changes) => [...changes, id]);
        }
    }, [changeAmount]);

    function addAmount() {
        setAmountN(amountN + 1);
        amountN + 1 === selectedAmount ? setChangeAmount(true) : setChangeAmount(false);
    }

    function removeAmount() {
        setAmountN(amountN - 1);
        amountN - 1 === selectedAmount ? setChangeAmount(true) : setChangeAmount(false);
    }

    function handleClick(action: string) {
        if (amountN >= 0 && amountN <= maxCount + selectedAmount) {
            action === 'add' ? addAmount() : removeAmount();
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const _input = event.target.value;
        const input: number = +_input;
        if ((input >= 0 && input <= maxCount + selectedAmount) || _input === '') {
            setAmountN(Number(input));
            input === selectedAmount ? setChangeAmount(true) : setChangeAmount(false);
        }
    }

    const handleSubmit = (action: string) => {
        const amount = amountN.toString();
        if (action === 'add') {
            fetcher.submit(
                { id, amount },
                {
                    method: 'put',
                    action: '/',
                }
            );
            setSelectedAmount(amountN);
            setChangeAmount(true);
        } else if (action === 'remove') {
            fetcher.submit({ id }, { method: 'delete', action: '/' });
        }
    };

    return (
        <ListItem key={id} sx={{ height: 50 }}>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <ListItemButton component={Link} to={`/tuotteet/${id}`}>
                        <ListItemText primary={name} />
                    </ListItemButton>
                </Grid>

                <Grid item xs={6}>
                    <Stack direction="row" justifyContent="flex-end">
                        <IconButton onClick={() => handleClick('remove')} disabled={amountN === 0}>
                            <RemoveIcon />
                        </IconButton>
                        <Input
                            inputProps={{
                                style: {
                                    width: 30,
                                    textAlign: 'center',
                                    border: '0.5px solid gray',
                                    borderRadius: '0.25rem',
                                },
                            }}
                            value={amountN}
                            onChange={(SelectChangeEvent) => handleChange(SelectChangeEvent)}
                            disableUnderline
                        />
                        <IconButton onClick={() => handleClick('add')} disabled={amountN === maxCount + selectedAmount}>
                            <AddIcon />
                        </IconButton>
                        <Button
                            color={amountN === 0 ? 'error' : 'primary'}
                            size="small"
                            aria-label="add more of same item to shopping cart"
                            onClick={() => handleSubmit('add')}
                            disabled={changeAmount}
                        >
                            {amountN === 0 ? (
                                <Typography variant="inherit">Poista korista</Typography>
                            ) : (
                                <Typography variant="inherit">Muuta määrää</Typography>
                            )}
                        </Button>
                        {/* {amountN === 0 ? (
                            <IconButton>
                                <CheckIcon />
                            </IconButton>
                        ) : (
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        )} */}
                    </Stack>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default ProductInCart;
