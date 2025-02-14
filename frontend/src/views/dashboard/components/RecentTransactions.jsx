import React from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import { Link, Typography } from "@mui/material";

const RecentTransactions = () => {
  return (
    <DashboardCard title="Recent Transactions">
      <Timeline
        className="theme-timeline"
        sx={{
          p: 0,
          mb: "-40px",
          "& .MuiTimelineConnector-root": {
            width: "1px",
            backgroundColor: "#efefef",
          },
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.5,
            paddingLeft: 0,
          },
        }}
      >
        {/* Example 1 */}
        <TimelineItem>
          <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            Payment received for Invoice{" "}
            <Link href="/" underline="none">
              #INV-102
            </Link>{" "}
            ($385.90)
          </TimelineContent>
        </TimelineItem>

        {/* Example 2 */}
        <TimelineItem>
          <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="secondary" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography fontWeight="600">New order placed</Typography>{" "}
            <Link href="/" underline="none">
              #SO-3467
            </Link>
          </TimelineContent>
        </TimelineItem>

        {/* Example 3 */}
        <TimelineItem>
          <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="success" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            Payment of $64.95 received from Michael (Invoice{" "}
            <Link href="/" underline="none">
              #INV-104
            </Link>
            )
          </TimelineContent>
        </TimelineItem>

        {/* Example 4 */}
        <TimelineItem>
          <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="warning" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography fontWeight="600">Return Order Processed</Typography>{" "}
            <Link href="/" underline="none">
              #RO-205
            </Link>
          </TimelineContent>
        </TimelineItem>

        {/* Example 5 */}
        <TimelineItem>
          <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="error" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography fontWeight="600">
              Delivery assigned to driver #DR-246
            </Typography>
          </TimelineContent>
        </TimelineItem>

        {/* Example 6 */}
        <TimelineItem>
          <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="success" variant="outlined" />
          </TimelineSeparator>
          <TimelineContent>
            Payment Received (Invoice{" "}
            <Link href="/" underline="none">
              #INV-105
            </Link>
            )
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </DashboardCard>
  );
};

export default RecentTransactions;
