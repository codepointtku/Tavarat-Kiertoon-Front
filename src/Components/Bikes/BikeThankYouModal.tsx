import { Box, Button, List, ListItem, Modal, Stack, Typography } from '@mui/material';
import type { bikeInterface } from '../../Layouts/BikesLayout';

interface BikeThankYouModalInterface {
    isThankYouModalVisible: boolean;
    setIsThankYouModalVisible: React.Dispatch<React.SetStateAction<null | boolean>>;
    setIsConfirmationVisible: React.Dispatch<React.SetStateAction<null | boolean>>;
    setIsIntroVisible: React.Dispatch<React.SetStateAction<null | boolean>>;
    reset: Function; // JTo: Not sure if this is OK ???
    getValues: Function; // JTo: Not sure if this is OK ???
    bikes: bikeInterface[];
}

/**
 * BikeThankYouModal - Modal to confirm that the rent process has finished succesfully.
 *
 * @param {bool} isThankYouModalVisible - state controlling Thank You modal visibility
 * @param {function} setIsThankYouModalVisible - setter for state controlling thank you modal visibility
 * @param {function} setIsConfirmationVisible -  setter for state controlling Confirmation view visibility
 * @param {function} setIsIntroVisible -  setter for state controlling Confirmation view visibility
 * @param {function} reset - reset form values to default
 * @param {function} getValues - read form values for rendering in thank you msg
 * @param {array} bikes - all bikes in the database, used in thank you msg rendering
 * @returns
 */
function BikeThankYouModal({
    isThankYouModalVisible,
    setIsThankYouModalVisible,
    setIsConfirmationVisible,
    setIsIntroVisible,
    reset,
    getValues,
    bikes,
}: BikeThankYouModalInterface) {
    // onClick: set Intro view true, set other views false, reset
    const modalExitHandler = () => {
        setIsThankYouModalVisible(false);
        setIsConfirmationVisible(false);
        setIsIntroVisible(true);
        reset();
    };

    // read the values the form is sending forwards
    const formValues = getValues();

    // RENDER
    return (
        <Modal open={isThankYouModalVisible} onClose={modalExitHandler} aria-labelledby="Order Succesfull">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 4,
                }}
            >
                <Stack gap={1}>
                    <Typography variant="h5" component="h2">
                        Tilaus onnistui
                    </Typography>
                    <Typography variant="h6">Vuokratut pyörät</Typography>
                    <List>
                        {/* "formValues.selectedBikes" has bikes in rent order as key:value pairs: key = bike ID, value = amount of bikes in storage. */}
                        {/* "bikes" has all the bikes in the bike database. render the bike types and amounts in the rent order */}
                        {Object.keys(formValues.selectedBikes)?.map((bikeId) =>
                            Object.values(bikes)?.map((bike) => {
                                if (bikeId === bike.id.toString()) {
                                    return (
                                        <ListItem key={bike.id} sx={{ my: 0, py: 0 }}>
                                            {formValues.selectedBikes[bikeId]} x {bike.name}
                                        </ListItem>
                                    );
                                }
                                return null;
                            })
                        )}
                    </List>
                    <Typography variant="h6">Vuokra-aika</Typography>
                    <List>
                        <ListItem sx={{ my: 0, py: 0 }}>
                            {/* only render dd.mm.yyyy in the thank you msg */}
                            {formValues.startDate?.toLocaleDateString()} - {formValues.endDate?.toLocaleDateString()}
                        </ListItem>
                    </List>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                        <Button color="success" onClick={modalExitHandler}>
                            Palaa etusivulle
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Modal>
    );
}

export default BikeThankYouModal;
