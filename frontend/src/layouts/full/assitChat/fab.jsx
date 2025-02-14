import {
  Box,
  Fab,
  IconButton,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { IconMessageChatbot, IconX } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Mistral } from "@mistralai/mistralai";
import { useSelector } from "react-redux";
import { useLongPress } from "use-long-press";
import { Typewriter } from "react-simple-typewriter";

const FloatingChatButton = () => {
  const [showAssist, setShowAssist] = useState(true);
  const [openConversation, setOpenConversation] = useState(false);
  const [isAiInitiated, setIsAiInitiated] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState("");

  useEffect(() => {
    if (isTyping) {
      const typingInterval = setInterval(() => {
        setTypingIndicator((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(typingInterval);
    } else {
      setTypingIndicator("");
    }
  }, [isTyping]);

  const bind = useLongPress(() => {
    setOpenConversation(false);
    setShowAssist(false);
  });

  const closeConversation = () => {
    setOpenConversation(false);
  };

  const handleOpenConversation = async (
    prompt = "hello, my name is MyanTech Admin"
  ) => {
    setOpenConversation(!openConversation);
    if (!openConversation && !isAiInitiated) {
      await initiateAiChat(prompt);
    }
  };

  const initiateAiChat = async (prompt) => {
    setIsTyping(true);
    const mistral = new Mistral({ apiKey: "5iNCxPCpoTnDbErb9smwB2NTRDByJ7lR" });
    const chatResponse = await mistral.chat.complete({
      model: "mistral-small",
      messages: [{ role: "user", content: prompt }],
    });
    const messageContent = chatResponse.choices[0].message.content;
    setConversationHistory((prev) => [
      ...prev,
      { sender: "ai", content: messageContent },
    ]);
    setIsTyping(false);
    setIsAiInitiated(true);
  };

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      setConversationHistory((prev) => [
        ...prev,
        { sender: "user", content: userMessage },
      ]);
      setUserMessage("");
      await initiateAiChat(userMessage);
    }
  };

  return (
    <>
      {showAssist && (
        <Fab
          {...bind()}
          color="primary"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseUp={() => handleOpenConversation()}
        >
          <IconMessageChatbot size={32} />
        </Fab>
      )}

      {openConversation && (
        <ChatArea
          messages={conversationHistory}
          close={closeConversation}
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          handleSendMessage={handleSendMessage}
          isTyping={isTyping}
          typingIndicator={typingIndicator}
        />
      )}
    </>
  );
};

const ChatArea = ({
  messages,
  close,
  userMessage,
  setUserMessage,
  handleSendMessage,
  isTyping,
  typingIndicator,
}) => {
  const mode = useSelector((state) => state.themes.mode);
  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 80,
        right: 16,
        width: 370,
        height: 515,
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        zIndex: 1051,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 16px",
          borderBottom: "1px solid #ddd",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <strong>AI chat support</strong>
        <IconButton size="small" onClick={close}>
          <IconX size={18} />
        </IconButton>
      </Box>
      <Box
        sx={{
          flex: 1,
          padding: 2,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                padding: "8px 12px",
                borderRadius: 2,
                backgroundColor:
                  msg.sender === "user"
                    ? "#48BEFF"
                    : { light: "#f5f5f5", dark: "#808687" }[mode],
                color: "#000",
                fontSize: "14px",
                display: "inline-block",
              }}
            >
              {msg.sender === "ai" ? (
                <Typewriter words={[msg.content]} typeSpeed={18} />
              ) : (
                msg.content
              )}
            </Box>
          </Box>
        ))}
        {isTyping && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                padding: "8px 12px",
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
                color: "black",
                fontSize: "14px",
                display: "inline-block",
              }}
            >
              {typingIndicator}
            </Box>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "8px 16px",
          borderTop: "1px solid #ddd",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ marginLeft: 1 }}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default FloatingChatButton;
