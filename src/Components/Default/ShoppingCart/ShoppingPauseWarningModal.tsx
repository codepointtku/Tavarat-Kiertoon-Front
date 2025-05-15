import * as React from 'react';
import { Link } from 'react-router-dom';

import { Backdrop, Box, Button, Modal, Fade, Link as MuiLink, Typography, Stack } from '@mui/material/';
import HeroText from '../../HeroText';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '1rem',
    boxShadow: 24,
    p: '1rem 2rem 2rem 2rem',
    overflow: 'auto',
};

function ShoppingPauseWarningModal() {
    const SuperLink = MuiLink as typeof MuiLink & typeof Link;

    const [warningModalOpened, setWarningModalOpened] = React.useState(true);

    const handleModal = () => {
        setWarningModalOpened(false);
    };

    const ModalFooter = () => {
        return (
            <Typography variant="body2">
                Voit jatkaa tilausprosessia lisäämällä tuotteita koriin{' '}
                <SuperLink component={Link} to="/">
                    tuotesivuilla
                </SuperLink>
            </Typography>
        );
    };

    return (
        <div>
            <Modal
                open={warningModalOpened}
                onClose={handleModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
                disableScrollLock
            >
                <Fade in={warningModalOpened} easing={'10000'}>
                    <Box sx={style}>
                        <Stack alignItems="center" spacing={2}>
                            <HeroText
                                title="Hei"
                                text="Järjestelmä on tauolla."
                                //subtext="Tuotteita voi pitää varattuna korissa vain tietyn ajan."
                                //footer={<ModalFooter />}
                            />

                            <Box>
                                <Button
                                    onClick={handleModal}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'success.dark',
                                        },
                                    }}
                                >
                                    Selvä!
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ShoppingPauseWarningModal;
