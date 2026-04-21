'use client';

import { useParams } from 'next/navigation';
import VotingPage from '@/features/vote/pages/voting-page';

export default function Page() {
  const params = useParams();
  const pollId = params.id as string;

  return <VotingPage pollId={pollId} />;
}
