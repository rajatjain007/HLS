// Generate .m3u8 and .ts files form the video

const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg("videos/video.mp4", { timeout: 432000 })
  .addOptions([
    "-profile:v baseline",
    "-level 3.0",
    "-start_number 0", // the first .ts file received will be at index 0
    "-hls_time 10", // each .ts file is a chunk of 10s of the video
    "-hls_list_size 0",
    "-f hls", // protocol: HLS
  ])
  .output("videos/output.m3u8")
  .on("end", () => {
    console.log("End");
  })
  .run();
