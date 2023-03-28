import PropTypes from 'prop-types';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';

/**
 *
 * @param {bool} isThankYouModalVisible
 * @param {bool} setIsThankYouModalVisible
 * @param {bool} setIsConfirmationVisible
 * @param {bool} setIsIntroVisible
 * @param {function} reset
 * @returns
 */
function BikeThankYouModal({
    isThankYouModalVisible,
    setIsThankYouModalVisible,
    setIsConfirmationVisible,
    setIsIntroVisible,
    reset,
}) {
    const onClickHandler = () => {
        setIsThankYouModalVisible(false);
        setIsConfirmationVisible(false);
        setIsIntroVisible(true);
        reset();
    };

    return (
        <Modal
            open={isThankYouModalVisible}
            onClose={() => setIsThankYouModalVisible(false)}
            aria-labelledby="Order Succesfull"
        >
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
                    <Typography variant="h6" component="h2">
                        Tilaus onnistui
                    </Typography>
                    <Typography variant="body1">Yhteyshenkilö</Typography>
                    <Typography variant="body1">Tuotteet</Typography>
                    <Typography variant="body1">Toimitusaika</Typography>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                        <Button color="success" onClick={onClickHandler}>
                            Palaa etusivulle
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Modal>
    );
}

BikeThankYouModal.propTypes = {
    setIsThankYouModalVisible: PropTypes.func.isRequired,
    isThankYouModalVisible: PropTypes.bool.isRequired,
    setIsConfirmationVisible: PropTypes.func.isRequired,
    setIsIntroVisible: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
};

export default BikeThankYouModal;

/*
Object { startDate: Date Mon Apr 03 2023 00:00:00 GMT+0300 (Itä-Euroopan kesäaika), startTime: 8, endDate: Date Fri Apr 07 2023 00:00:00 GMT+0300 (Itä-Euroopan kesäaika), endTime: 13, selectedBikes: {…}, contactPersonName: "r", contactPersonPhoneNumber: "5", deliveryAddress: "r", pickup: false, storageType: "inside", … }
    contactPersonName: "r"
    contactPersonPhoneNumber: "5"
    deliveryAddress: "r"
    endDate: Date Fri Apr 07 2023 00:00:00 GMT+0300 (Itä-Euroopan kesäaika)
    endTime: 13
    extraInfo: "r"
    pickup: false
    selectedBikes: Object { 1: 1 }
    startDate: Date Mon Apr 03 2023 00:00:00 GMT+0300 (Itä-Euroopan kesäaika)
    startTime: 8
    storageType: "inside"
<prototype>: Object { … }
*/
