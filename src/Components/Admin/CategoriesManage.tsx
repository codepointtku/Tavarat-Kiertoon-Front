import { useState, useRef } from 'react';
import { Form, useSubmit, useLoaderData, useActionData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import arrayToTree from 'array-to-tree';

import { TreeView, TreeItem } from '@mui/lab';
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    Popover,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import DeselectIcon from '@mui/icons-material/Deselect';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
// import InputIcon from '@mui/icons-material/Input';

import HeroText from '../HeroText';
import HeroHeader from '../HeroHeader';
import Tooltip from '../Tooltip';
import AlertBox from '../AlertBox';

import type { categoriesManageAction } from '../../Router/actions';
import type { categoriesManageLoader } from '../../Router/loaders';

import type { Tree } from 'array-to-tree';

interface CategoryObject {
    id: number | string;
    level: number;
    lft: number;
    name: string;
    parent: number | null;
    product_count: number;
    rght: number;
    tree_id: number;
    children?: Tree<CategoryObject>[];
}

type EmptyObject = Record<string, never>;

function CategoryTree() {
    const responseStatus = useActionData() as Awaited<ReturnType<typeof categoriesManageAction>>;
    const { categories } = useLoaderData() as Awaited<ReturnType<typeof categoriesManageLoader>>;
    const categoryNamesMap = categories.map((category) => category.name);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);
    const [showDeletePrompt, setShowDeletePrompt] = useState<boolean>(true);
    const [showDeleteErrorMessage, setShowDeleteErrorMessage] = useState<boolean>(false);
    const [showMutateErrorMessage, setShowMutateErrorMessage] = useState<boolean>(false);
    const [selectedChoice, setSelectedChoice] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<CategoryObject | EmptyObject | null>(null);
    let selectedNodeRef = useRef<CategoryObject | EmptyObject>({});

    const handleClick = (node: any) => {
        selectedNodeRef.current = node;

        setSelectedCategory(selectedNodeRef.current);
        setShowDeletePrompt(false);
        setShowDeleteErrorMessage(false);
        setShowMutateErrorMessage(false);
    };

    function handlePopOverOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    const categoryTreeMain = arrayToTree(categories, {
        parentProperty: 'parent',
        customID: 'id',
    });

    const fullTree = {
        id: 'root',
        name: 'Kategoriat:',
        product_count: null,
        children: categoryTreeMain,
    };

    const renderTree = (nodes: CategoryObject) => (
        <TreeItem
            key={nodes.id}
            nodeId={String(nodes.id)}
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {nodes.name}
                    </Typography>
                    {nodes.product_count === null ? null : (
                        <>
                            {nodes.product_count !== 0 ? (
                                <Typography fontSize="fontSizeSmall" fontWeight="fontWeightThin">
                                    Tuotemäärä: {nodes.product_count}
                                </Typography>
                            ) : (
                                <Typography fontSize="fontSizeSmall" fontWeight="fontWeightThin" color="error.main">
                                    Tyhjä
                                </Typography>
                            )}
                        </>
                    )}
                </Box>
            }
            onClick={() => handleClick(nodes)}
            expandIcon={<ArrowRightOutlinedIcon />}
            collapseIcon={<ArrowDropDownOutlinedIcon />}
        >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node as CategoryObject)) : null}
        </TreeItem>
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid, errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            cat: '',
        },
    });

    const submit = useSubmit();

    const onSubmit = (data: any) => {
        if (!selectedChoice) {
            return null;
        }

        if (selectedChoice === 'add') {
            if (selectedCategory?.id === 'root') {
                const newMainCategory = {
                    ...data,
                };

                submit(newMainCategory, { method: 'post' });
                reset();
                return;
            }

            const newSubCategory = {
                ...data,
                parent: selectedCategory?.id,
            };

            submit(newSubCategory, { method: 'post' });
            reset();
            return;
        }

        if (selectedChoice === 'mutate') {
            if (selectedCategory?.id === 'root') {
                setShowMutateErrorMessage(true);
                return;
            }

            // parent	integer
            // nullable: true

            setShowMutateErrorMessage(false);
            const mutatedCategory = {
                ...data,
                id: selectedCategory?.id,
                parent: selectedCategory?.parent, // it is possible to move a category with this value. UI for inputting this value does not exist in this code.
            };

            submit(mutatedCategory, { method: 'put' });
            reset();
        }
    };

    const handleSubmitCategoryDelete = () => {
        if (selectedCategory?.product_count !== 0 || selectedCategory?.children || selectedCategory?.id === 'root') {
            setShowDeletePrompt(false);
            setShowDeleteErrorMessage(true);
            return;
        }

        submit({ id: selectedCategory?.id.toString() }, { method: 'delete' });
        setShowDeletePrompt(false);
        setSelectedCategory(null);
        handleChoice('');
    };

    const handleChoice = (value: string) => {
        setSelectedChoice(value);

        if (value === 'delete') {
            setShowDeletePrompt(true);
        }
    };

    const handleDeselect = () => {
        setSelectedCategory(null);
        handleChoice('');
        selectedNodeRef.current = {};
    };

    return (
        <>
            {responseStatus?.type === 'categorymanage' && responseStatus?.status === false && (
                <AlertBox text="Virhe tietojen käsittelyssä" status="error" />
            )}

            {responseStatus?.type === 'categorycreate' && responseStatus?.status === true && (
                <AlertBox text="Kategoria lisätty" status="success" timer={2000} />
            )}

            {responseStatus?.type === 'categorymutate' && responseStatus?.status === true && (
                <AlertBox text="Nimi muokattu" status="success" timer={2000} />
            )}

            {responseStatus?.type === 'categorydelete' && responseStatus?.status === true && (
                <AlertBox text="Kategoria poistettu" status="success" timer={2000} />
            )}

            <Grid
                container
                id="components-wrapper"
                justifyContent="space-between"
                gap={6}
                marginBottom="1rem"
                flexWrap="wrap-reverse"
            >
                <Grid item xs={12} sm={true}>
                    <Box id="treeview-container" sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TreeView defaultExpanded={['root']} sx={{ flexGrow: 1, minWidth: 380, overflowY: 'auto' }}>
                            {renderTree(fullTree as unknown as CategoryObject)}
                        </TreeView>
                    </Box>
                </Grid>

                {/* /// --- /// */}
                <Grid item xs={12} sm={true}>
                    <Stack
                        id="nodeactions-component-container"
                        component={Form}
                        onSubmit={handleSubmit(onSubmit)}
                        direction="column"
                        sx={{
                            display: 'flex',
                            flex: '1',
                            minWidth: 380,
                            paddingTop: '1rem',
                        }}
                    >
                        {selectedCategory !== null ? (
                            <Box id="nodeaction-btns-wrapper">
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography>Valittu: {selectedCategory?.name}</Typography>
                                    {selectedCategory?.level === 0 || selectedCategory?.level === 1 ? (
                                        <>
                                            <Stack direction="row" alignItems="center">
                                                <Typography fontSize="14px" color="info.main">
                                                    Tähän kategoriaan ei voi lisätä tuotteita
                                                </Typography>
                                                <IconButton size="small" color="info" onClick={handlePopOverOpen}>
                                                    <HelpOutlineIcon />
                                                </IconButton>
                                            </Stack>

                                            <Popover
                                                open={openPopover}
                                                anchorEl={anchorEl}
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                                onClose={() => setAnchorEl(null)}
                                                sx={{ mt: 1 }}
                                            >
                                                <Stack
                                                    justifyContent="center"
                                                    sx={{ p: '1rem', maxWidth: '300px' }}
                                                    spacing={1}
                                                >
                                                    <Typography variant="body2">
                                                        Kategoriarakenteella on 3-tasoinen syvyys.
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Tuotteet ovat tarkoitettu lajiteltavaksi alimpaan tasoon.
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Tuotteiden lisäys muihin, kuin alimpaan tasoon on estetty.
                                                    </Typography>
                                                    <Divider />
                                                    <Typography variant="body2">
                                                        Kategoria, millä ei ole järjestelmän odottamaa syvyyttä näyttää
                                                        kaupan puolella kaikki tuotteet.
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Selkeän toiminnan varmistamiseksi tulee huolehtia odotetun
                                                        rakenteen ylläpidosta.
                                                    </Typography>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() => setAnchorEl(null)}
                                                    >
                                                        Sulje
                                                    </Button>
                                                </Stack>
                                            </Popover>
                                        </>
                                    ) : null}
                                </Stack>
                                <Stack direction="row" spacing={4} my="1rem" sx={{ justifyContent: 'center' }}>
                                    <Tooltip title="Poista valinta">
                                        <IconButton size="small" onClick={handleDeselect}>
                                            <DeselectIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Lisää uusi kategoria tämän alle">
                                        <IconButton
                                            size="small"
                                            sx={{ '&:hover': { backgroundColor: 'success.dark' } }}
                                            onClick={() => handleChoice('add')}
                                            disabled={selectedCategory.level === 2}
                                        >
                                            <AddCircleOutlineIcon
                                                color={selectedChoice === 'add' ? 'success' : 'inherit'}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Nimeä uudelleen">
                                        <IconButton
                                            size="small"
                                            sx={{ '&:hover': { backgroundColor: 'warning.main' } }}
                                            onClick={() => handleChoice('mutate')}
                                        >
                                            <EditIcon color={selectedChoice === 'mutate' ? 'warning' : 'inherit'} />
                                        </IconButton>
                                    </Tooltip>
                                    {/* probably needs a new view @ BE: */}
                                    {/* <Tooltip title="Tuotteiden siirto toiseen kategoriaan">
                                    <IconButton
                                        size="small"
                                        sx={{ '&:hover': { backgroundColor: 'info.main' } }}
                                        onClick={() => handleChoice('transfer')}
                                    >
                                        <InputIcon />
                                    </IconButton>
                                </Tooltip> */}
                                    <Tooltip title="Poista">
                                        <IconButton
                                            size="small"
                                            sx={{ '&:hover': { backgroundColor: 'error.main' } }}
                                            onClick={() => handleChoice('delete')}
                                        >
                                            <DeleteForeverIcon
                                                color={selectedChoice === 'delete' ? 'error' : 'inherit'}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                                <Divider />
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flex: '1',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography>Ei valittua kategoriaa</Typography>
                            </Box>
                        )}

                        <Box id="nodestat-action-area">
                            <Stack marginTop="1.6rem">
                                {selectedChoice === 'add' && (
                                    <Box>
                                        <TextField
                                            id="input-color"
                                            type="text"
                                            label="Uusi kategoria"
                                            {...register('cat', {
                                                required: {
                                                    value: true,
                                                    message: 'Syötä nimi',
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: 'Nimen tulee olla vähintään kolme merkkiä pitkä',
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: 'Maksimipituus',
                                                },
                                                validate: (val: string) => {
                                                    if (categoryNamesMap.includes(val)) {
                                                        return 'Kategoria on jo järjestelmässä';
                                                    }
                                                },
                                            })}
                                            color={isValid ? 'success' : 'primary'}
                                            error={!!errors.cat}
                                            helperText={errors.cat?.message?.toString() || ' '}
                                            disabled={selectedCategory?.level === 2}
                                            fullWidth
                                        />
                                        <Button
                                            type="submit"
                                            disabled={!isValid || selectedCategory?.level === 2}
                                            fullWidth
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'success.dark',
                                                },
                                            }}
                                        >
                                            Lisää
                                        </Button>
                                        {selectedCategory?.level === 2 && (
                                            <Typography fontSize="14px" color="info.main">
                                                Kategoriarakenteen syvyys on rajoitettu kolmeen tasoon
                                            </Typography>
                                        )}
                                    </Box>
                                )}

                                {selectedChoice === 'mutate' && (
                                    <Box>
                                        <TextField
                                            id="input-color"
                                            type="text"
                                            label="Nimen muokkaus"
                                            {...register('cat', {
                                                required: {
                                                    value: true,
                                                    message: 'Syötä nimi',
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: 'Nimen tulee olla vähintään kolme merkkiä pitkä',
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: 'Maksimipituus',
                                                },
                                                validate: (val: string) => {
                                                    if (categoryNamesMap.includes(val)) {
                                                        return 'Kategoria on jo järjestelmässä';
                                                    }
                                                },
                                            })}
                                            error={!!errors.cat}
                                            helperText={errors.cat?.message?.toString() || ' '}
                                            fullWidth
                                        />
                                        <Button
                                            type="submit"
                                            disabled={!isValid || showMutateErrorMessage}
                                            fullWidth
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'success.dark',
                                                },
                                            }}
                                        >
                                            Vahvista
                                        </Button>

                                        {showMutateErrorMessage && (
                                            <Typography fontSize="14px" color="info.main" marginTop={2}>
                                                Kategoriarakenteen ylintä osaa ei voi nimetä uudelleen
                                            </Typography>
                                        )}
                                    </Box>
                                )}

                                {selectedChoice === 'delete' && (
                                    <Box>
                                        {showDeletePrompt && (
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ p: '1rem' }}
                                                spacing="1rem"
                                            >
                                                <Typography variant="body2">Oletko varma?</Typography>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={handleSubmitCategoryDelete}
                                                    sx={{
                                                        '&:hover': {
                                                            backgroundColor: 'success.main',
                                                        },
                                                    }}
                                                >
                                                    Kyllä
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => setShowDeletePrompt(false)}
                                                    sx={{
                                                        '&:hover': {
                                                            backgroundColor: 'warning.main',
                                                        },
                                                    }}
                                                >
                                                    Peruuta
                                                </Button>
                                            </Stack>
                                        )}

                                        {showDeleteErrorMessage && (
                                            <Box>
                                                <Typography variant="body1" color="info.main" textAlign="center">
                                                    Poistoa ei suoritettu.
                                                </Typography>
                                                <Box paddingTop={2} paddingLeft={2}>
                                                    <Typography variant="body2">
                                                        Kategorian poistamiseksi seuraavien ehtojen on täytyttävä:
                                                    </Typography>
                                                    <Box paddingTop={1} paddingLeft={1}>
                                                        <Typography variant="body2">
                                                            - Kategorian on oltava tyhjä tuotteista.
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            - Kategorialla ei ole ala-kategorioita, vaikka ne olisivat
                                                            tyhjiä.
                                                        </Typography>
                                                        <Divider sx={{ my: 2 }} />
                                                        <Typography variant="body2">
                                                            Huom: Koko kategoriarakenteen ylimmän osan poistaminen on
                                                            estetty.
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Stack>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

function CategoriesManage() {
    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<DeviceHubIcon />} hideInAdmin />
            <HeroText title="Kategorioiden hallinta" subtext2="Lisää, muokkaa ja poista tuotekategorioita" />
            <CategoryTree />
        </Container>
    );
}

export default CategoriesManage;
