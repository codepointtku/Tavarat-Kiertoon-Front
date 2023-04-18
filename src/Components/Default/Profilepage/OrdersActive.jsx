import { Box } from '@mui/material';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import Typography from '@mui/material/Typography';

import TypographyHeading from '../../TypographyHeading';

function CustomizedTimeline() {
    return (
        <Timeline position="alternate">
            <TimelineItem>
                <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                    Vastaanotettu
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                        <FastfoodIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Tilauksesi on vastaanotettu
                    </Typography>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                    Käsittelemme tilaustasi
                </TimelineOppositeContent>

                <TimelineSeparator>
                    <TimelineConnector />

                    <TimelineDot color="primary">
                        <LaptopMacIcon />
                    </TimelineDot>

                    <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent sx={{ py: '2rem', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Käsittelyssä
                    </Typography>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                    Hetki vielä..
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                        <FastfoodIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '2rem', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Kuljetuksessa
                    </Typography>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                    Valmis!
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                        <FastfoodIcon />
                    </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '2rem', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Toimitettu
                    </Typography>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}

function ProfileInfo({ userOrders }) {
    console.log('ollaan aktiiviset tilaukset', userOrders);
    return (
        <Box sx={{ border: '1px solid red' }}>
            <TypographyHeading text="Aktiiviset tilaukset" />
            <CustomizedTimeline />
        </Box>
    );
}

export default ProfileInfo;
