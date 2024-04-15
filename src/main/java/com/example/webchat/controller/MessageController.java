package com.example.webchat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.webchat.model.Message;

@RestController
public class MessageController {
    //
    @MessageMapping("/message")
    //is url ko jo subscribe kiya hoga usse  /message wala url ka message milega.....
    @SendTo("/topic/return-to")
    public Message getContent(@RequestBody Message message) {

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return message;
    }

}
