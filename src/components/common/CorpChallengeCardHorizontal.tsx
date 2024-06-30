interface Challenge {
  title: string;
  logo: string;
  description: string;
  corpName: string;
  challengeUrl: string;
  endAt: string;
}

const CorpChallengeCardHorizontal: React.FC<Challenge> = ({
  title,
  logo,
  description,
  corpName,
  challengeUrl,
  endAt,
}) => {
  return (
    <div
      className="flex items-center min-w-[37vw] p-[1.5vh] rounded-[1.5rem] border mb-[2vh] h-[18vh]"
      style={{ backgroundColor: "#FBFBFB" }}
      onClick={() => window.open(challengeUrl)}
    >
      <div className="flex items-start gap-5 p-[0.5vh] ml-[1vh] w-full">
        <img
          src={logo}
          width={40}
          alt="Challenge Logo"
          className="pt-[0.4vh]"
        />
        <div className="flex-col mr-[2vh] grow">
          <p
            className="text-[1rem] font-medium mt-[0.2vh]"
            style={{ wordBreak: "keep-all" }}
          >
            {title}
          </p>
          <p
            className="mt-[1vh] text-C333333 text-[0.8rem] whitespace-normal leading-tight"
            style={{ wordBreak: "keep-all" }}
          >
            {description}
          </p>
          <div className="flex justify-between mt-[1vh] ">
            <p className="mt-[0.2vh] text-C333333 text-[0.8rem] whitespace-normal leading-tight">
              {corpName}
            </p>
            <p className="mt-[0.2vh] text-C333333 text-[0.8rem] whitespace-normal leading-tight">
              {`${endAt} 까지`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorpChallengeCardHorizontal;
