"use client"
// import { category, CategoryList } from "@/components/Category/CategoryList";
import { useBackButton } from "@/components/telegram/Page";
import { useEffect } from "react";

// const list: category[] = [
//   {
//     id: 1,
//     title: "Text",
//     itemList: [
//       {
//         id: 1,
//         title: "GPT-4o",
//         description:
//           "OpenAI's most powerful model, GPT-4o, leveraging the latest Nov 2024 model snapshot, which provides more natural, engaging & tailored writing and overall provides more thorough, insightful responses. Stronger than GPT-3.5 in quantitative questions (math and physics), creative writing, and many other challenging tasks. Context window has been shortened to optimize for performance -- for longer context messages, please use GPT-4o-128k.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-3015-200-ivodfqemfvztmvgafhdouijhknthkvmp.jpeg",
//       },
//       {
//         id: 2,
//         title: "Claude-3.5-Sonnet",
//         description:
//           "Anthropic's most powerful model (using the latest model snapshot as of October 22, 2024). Excels in complex tasks like coding, writing, analysis and visual processing. The context window has been shortened to optimize for speed and cost. For longer context messages, please try Claude-3.5-Sonnet-200k. The compute points value is subject to change.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-1019-200-ecyfizaydihfkxfwhwjlruyjdyoxengr.jpeg",
//       },
//       {
//         id: 3,
//         title: "o1-mini",
//         description:
//           "This OpenAI model is a faster, cheaper version of o1 that is particularly good at coding, math, and science applications when broad general knowledge is not required. Supports 128k tokens of context.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-3025-200-hhrrqrzhtikatlbwhnxhygqyraobsyer.jpeg",
//       },
//       {
//         id: 4,
//         title: "Grok-beta",
//         description:
//           "Grok-beta is an early preview of xAI's most intelligent language model. It features state-of-the-art capabilities in coding, reasoning, and answering questions. It excels at handling complex and multi-step tasks. Grok-beta does not have access to real-time information from X or the internet as part of its integration with Poe. For longer context messages, please try Grok-beta-128k. The compute points value is subject to change.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-5124424-200-yqognbewbacsiadtjfzhgsrgntziokle.jpeg",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Image",
//     itemList: [
//       {
//         id: 1,
//         title: "FLUX-pro-1.1-ultra",
//         description:
//           "State-of-the-art image generation with four times the resolution of standard FLUX-1.1-pro. Best-in-class prompt adherence and pixel-perfect image detail. Use '--aspect' to select an aspect ratio (e.g --aspect 1:1). Add '--raw' (no other arguments needed) for an overall less processed, everyday aesthetic. Send  an image to have this model reimagine/regenerate it via FLUX Redux.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-5273253-200-bnztxnyqyrqwmldpbipdybmafmboyyqm.jpeg",
//       },
//       {
//         id: 2,
//         title: "FLUX-pro-1.1",
//         description:
//           "State-of-the-art image generation with top-of-the-line prompt following, visual quality, image detail and output diversity. This is the most powerful version of FLUX 1.1, use '--aspect' to select an aspect ratio (e.g --aspect 1:1). Send an image to have this model reimagine/regenerate it via FLUX Redux.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-5038493-200-kaqjjvliljatttdmmgeqyflyvlevubcb.jpeg",
//       },
//       {
//         id: 3,
//         title: "Playground-v3",
//         description:
//           "Latest image model from Playground, with industry leading capabilities in understanding complex prompts to generate realistic images, logos, typography, and more. Allows users to specify elements to avoid in the image using the `--no` parameter at the end of the prompt (e.g. 'Tall trees, daylight --no rain'). Optionally, specify the aspect ratio using the '--aspect' parameter (e.g. 'Tall trees, daylight --aspect 1:2'). Powered by Playground_v3 from playground.com.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-4791278-200-dkexsqtdupzuvzyljnykjtrjupgkgiox.jpeg",
//       },
//       {
//         id: 4,
//         title: "Ideogram-v2",
//         description:
//           "Latest image model from Ideogram, with industry leading capabilities in generating realistic images, graphic design, typography, and more. Allows users to specify the aspect ratio of the image using the '--aspect' parameter at the end of the prompt (e.g. 'Tall trees, daylight --aspect 9:16'). Valid aspect ratios are 10:16, 16:10, 9:16, 16:9, 3:2, 2:3, 4:3, 3:4, 1:1. '--style' parameter can be defined to specify the style of image generated(GENERAL, REALISTIC, DESIGN, RENDER_3D, ANIME). Powered by Ideogram.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-4801915-200-iiapwrsitfvrxjugdgapgdgcgkozfanr.jpeg",
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "Video",
//     itemList: [
//       {
//         id: 1,
//         title: "Runway",
//         description:
//           "Runway's Gen-3 Alpha Turbo model creates best-in-class, controllable, and high-fidelity video generations based on your prompts. Both text inputs and image inputs are supported, but we recommend using image inputs for best results. Use --aspect-ratio (16:9, 9:16, landscape, portrait) for landscape/portrait videos.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-5078946-200-jsndnxbvsncuxazsaoakhffbbgwtkhup.jpeg",
//       },
//       {
//         id: 2,
//         title: "Dream-Machine",
//         description:
//           "Luma AI's Dream Machine is an AI model that makes high-quality, realistic videos fast from text and images. Iterate at the speed of thought, create action-packed shots, and dream worlds with consistent characters on Poe today! To specify the aspect ratio of your video add --aspect_ratio (1:1, 16:9, 9:16, 4:3, 3:4, 21:9, 9:21). To loop your video add --loop True.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-4953923-200-nvvelkcjqscezveupiisttjkxvoxiqdf.jpeg",
//       },
//       {
//         id: 3,
//         title: "Pika",
//         description:
//           "Generate a video using a text prompt, an image, or a video. Pass in optional parameters using flags following your prompt. (e.g. 'A cat riding a skateboard --aspect 16:9 --framerate 24') Additional parameters: --aspect (e.g. 16:9, 19:13) --framerate (between 8-24) --motion (motion intensity, between 0-4) --gs (guidance scale/relevance to text, between 8-24) --no (negative prompt, e.g. ugly, scary) --seed (e.g. 12345) Camera control (use one at a time): --zoom ('in' or 'out') --pan ('left' or 'right') --tilt ('up' or 'down') --rotate ('cw' or 'ccw') Powered by Pika.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-4229971-200-puyjnwkbdurpgjtcctjaaeczbhginsob.jpeg",
//       },
//       {
//         id: 4,
//         title: "Haiper2.0",
//         description: "Text- and image-to-video model by Haiper.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-5324580-200-agfjwvxlgiltckyhehwnqllunwtzesjt.jpeg",
//       },
//     ],
//   },
//   {
//     id: 4,
//     title: "Sound",
//     itemList: [
//       {
//         id: 1,
//         title: "GPT-4o",
//         description:
//           "OpenAI's most powerful model, GPT-4o, leveraging the latest Nov 2024 model snapshot, which provides more natural, engaging & tailored writing and overall provides more thorough, insightful responses. Stronger than GPT-3.5 in quantitative questions (math and physics), creative writing, and many other challenging tasks. Context window has been shortened to optimize for performance -- for longer context messages, please use GPT-4o-128k.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-3015-200-ivodfqemfvztmvgafhdouijhknthkvmp.jpeg",
//       },
//       {
//         id: 2,
//         title: "Claude-3.5-Sonnet",
//         description:
//           "Anthropic's most powerful model (using the latest model snapshot as of October 22, 2024). Excels in complex tasks like coding, writing, analysis and visual processing. The context window has been shortened to optimize for speed and cost. For longer context messages, please try Claude-3.5-Sonnet-200k. The compute points value is subject to change.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-1019-200-ecyfizaydihfkxfwhwjlruyjdyoxengr.jpeg",
//       },
//       {
//         id: 3,
//         title: "o1-mini",
//         description:
//           "This OpenAI model is a faster, cheaper version of o1 that is particularly good at coding, math, and science applications when broad general knowledge is not required. Supports 128k tokens of context.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-3025-200-hhrrqrzhtikatlbwhnxhygqyraobsyer.jpeg",
//       },
//       {
//         id: 4,
//         title: "Grok-beta",
//         description:
//           "Grok-beta is an early preview of xAI's most intelligent language model. It features state-of-the-art capabilities in coding, reasoning, and answering questions. It excels at handling complex and multi-step tasks. Grok-beta does not have access to real-time information from X or the internet as part of its integration with Poe. For longer context messages, please try Grok-beta-128k. The compute points value is subject to change.",
//         imgUrl:
//           "https://qph.cf2.poecdn.net/main-thumb-pb-5124424-200-yqognbewbacsiadtjfzhgsrgntziokle.jpeg",
//       },
//     ],
//   },
// ];

const HomePage = () => {
  const { setIsVisible } = useBackButton();

  useEffect(() => {
    setIsVisible(false)
  });

  return (
    <section className="flex flex-col gap-2 px-6">
      <div className="grid grid-rows-2">
        <div className="grid grid-cols-2">
          <div className="bg-primary rounded-sm">متن</div>
          <div className="bg-slate-700 rounded-custom">عکس</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="bg-red-500 rounded-custom">ویدیو</div>
          <div className="bg-purple-600 rounded-md">صوت</div>
        </div>
      </div>
      {/* {list.map((item) => (
          <CategoryList
            id={item.id}
            itemList={item.itemList}
            title={item.title}
            key={item.id}
          />
        ))} */}
    </section>
  );
};

export default HomePage;
