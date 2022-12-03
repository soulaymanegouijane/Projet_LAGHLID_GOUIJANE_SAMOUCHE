package com.projet.service;

import com.projet.entity.Member;

import java.util.Set;

public interface MemberService {
    Set<Member> retreiveAllMembers(long id);
}
