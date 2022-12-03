package com.projet.controller;

import com.projet.entity.Member;
import com.projet.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/association")
@CrossOrigin("*")
public class AssociationController {

    @Autowired
    MemberService memberService;

    @GetMapping("/{id}/members")
    public Set<Member> retreiveAllMembers(@PathVariable long id){
        return memberService.retreiveAllMembers(id);
    }
}
