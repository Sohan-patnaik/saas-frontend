
import ChatUI from "../../components/ChatUI";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ botId: string }>;
}) {
  const { botId } = await params;

  return <ChatUI botId={botId} />;
}
