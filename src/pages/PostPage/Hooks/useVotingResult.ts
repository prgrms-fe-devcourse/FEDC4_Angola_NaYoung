import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_KEYS } from '@constants';
import type { Comment } from '@type';
import { voteRatio } from '@utils';

interface useVotingResultProps {
  comments: Comment[];
}

const useVotingResult = ({ comments }: useVotingResultProps) => {
  const [searchParams] = useSearchParams();
  const votedValue = searchParams.get(SEARCH_KEYS.VOTED);
  const [ratios, setRatio] = useState({ aRatio: 0, bRatio: 0 });

  useEffect(() => {
    comments && comments.length > 0 && setRatio({ ...voteRatio(comments) });
  }, [comments]);

  return { votedValue, ratios };
};

export default useVotingResult;
