import { Message } from "../model/Message.model.js";
import User from "../model/User.model.js";

const sendMessage = async (senderId, receiverId, payload) => {
  const newMessage = await Message.create({
    senderId,
    receiverId,
    message: payload.message,
  });
  return newMessage;
};

const getMessage = async (senderId, receiverId) => {
  const result = await Message.find({
    $or: [
      {
        $and: [
          { senderId: { $eq: senderId } },
          { receiverId: { $eq: receiverId } },
        ],
      },
      {
        $and: [
          { senderId: { $eq: receiverId } },
          { receiverId: { $eq: senderId } },
        ],
      },
    ],
  });

  return result;
};

const getLastMessageWithUser = async (userId1, userId2) => {
  return await Message.findOne({
    $or: [
      { senderId: userId1, receiverId: userId2 },
      { senderId: userId2, receiverId: userId1 },
    ],
  }).sort({ createdAt: -1 });
};

const getParticipants = async (userId) => {
  const messages = await Message.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  });
  const participants = new Set();
  messages.forEach((message) => {
    if (message.senderId.toString() !== userId.toString()) {
      participants.add(message.senderId.toString());
    }
    if (message.receiverId.toString() !== userId.toString()) {
      participants.add(message.receiverId.toString());
    }
  });

  const participantIds = Array.from(participants);
  const usersWithLastMessages = await Promise.all(
    participantIds.map(async (participantId) => {
      const user = await User.findById(participantId)
        .select("-password")
        .sort({ createdAt: -1 });
      const lastMessage = await getLastMessageWithUser(userId, participantId);
      return {
        user,
        lastMessage,
      };
    })
  );

  usersWithLastMessages.sort((a, b) => {
    if (a.lastMessage && b.lastMessage) {
      return b.lastMessage.createdAt - a.lastMessage.createdAt;
    } else if (a.lastMessage) {
      return -1;
    } else if (b.lastMessage) {
      return 1;
    } else {
      return 0;
    }
  });

  return usersWithLastMessages;
};

const updateStatusMessage = async (messageId) => {
  const result = await Message.findByIdAndUpdate(
    messageId,
    {
      status: "seen",
    },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};
const deleteMessage = async (messageId) => {
  const result = await Message.findByIdAndUpdate(
    messageId,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const messageService = {
  sendMessage,
  getMessage,
  getParticipants,
  updateStatusMessage,
  deleteMessage,
};
