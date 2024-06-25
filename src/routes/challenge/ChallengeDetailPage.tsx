import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import Challenge from "../../components/challenge/Challenge";
import Navbar from "../../components/common/Navbar";
import { useParams } from "react-router-dom";
import { fetchChallengeById } from "../../libs/apis/challenge";
import { ChallengeResponse } from "../../libs/apis/responses/response";
const ChallengeDetailPage = () => {
  // 각 챌린지에 대한 정보
  const { challengeId } = useParams<{ challengeId: string }>();
  const [challenge, setChallenge] = useState<ChallengeResponse | null>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchChallengeById(challengeId!);
        setChallenge(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header text={challenge?.name} type={"backLeftTextCenter"} />
      <div className="mt-[4.5vh]"></div>
      <Challenge
        id={challenge?.id!}
        title={challenge?.name!}
        status={challenge?.status!}
        description={challenge?.description!}
        dateRange={`${challenge?.startAt} ~ ${challenge?.endAt}`}
        participants={challenge?.participation!}
        image={challenge?.logoUrl!}
        detailDescription={challenge?.detailDescription!}
        reward={challenge?.reward!}
      />
      <Navbar />
    </>
  );
};

export default ChallengeDetailPage;
