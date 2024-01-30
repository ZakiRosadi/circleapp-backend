// import moment from "moment";

// export default function getFormattedTimeDifference(post: any): string {
//   const postTime = moment(post.postedAt);
//   const currentTime = moment();
//   const minutesDiff = currentTime.diff(postTime, "minutes");

//   const thresholds = [
//     { threshold: 1, label: "just now" },
//     { threshold: 60, label: "min", singular: "min" },
//     { threshold: 60 * 24, label: "hour", singular: "hour" },
//     // Add more thresholds as needed
//   ];

//   const threshold = thresholds.find((t) => minutesDiff < t.threshold);

//   let formattedTime;
//   if (threshold) {
//     const unit =
//       threshold.singular && minutesDiff === 1
//         ? threshold.singular
//         : threshold.label;
//     formattedTime =
//       minutesDiff < 1
//         ? threshold.label
//         : `${minutesDiff} ${unit}${minutesDiff !== 1 ? "s" : ""} ago`;
//   } else {
//     formattedTime = postTime.format("MMMM D, YYYY [at] h:mm A");
//   }

//   return formattedTime;
// }
