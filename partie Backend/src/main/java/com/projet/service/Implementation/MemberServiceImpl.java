package com.projet.service.Implementation;

import com.projet.entity.Member;
import com.projet.repository.MemberRepository;
import com.projet.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Override
    @PreAuthorize("hasRole('REPRESENTATIVE')")
    public Set<Member> retreiveAllMembers(long id) {
        return new HashSet<>(memberRepository.findAllByAssociationId(id));
    }
}

