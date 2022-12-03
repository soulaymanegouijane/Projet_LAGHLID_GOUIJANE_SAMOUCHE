package com.projet;

import com.projet.entity.Association;
import com.projet.entity.Member;
import com.projet.entity.Role;
import com.projet.repository.AssociationRepository;
import com.projet.repository.MemberRepository;
import com.projet.utils.Permission;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@SpringBootApplication
public class ProjetApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjetApplication.class, args);
	}



	@Bean
	CommandLineRunner start(MemberRepository memberRepository,
                            AssociationRepository associationRepository,
							PasswordEncoder bCryptPasswordEncoder) {
		return args -> {
			Association association = associationRepository.save(Association.builder()
					.description("description d'asso")
					.name("nom de l'asso")
					.build());
			Member representer = memberRepository.save(Member.builder()
					.association(association)
							.email("admin@admin.com")
							.password(bCryptPasswordEncoder.encode("admin"))
							.firstname("brahim")
							.username("admin")
							.roles(Set.of(Role.builder()
									.name(Permission.ROLE_REPRESENTATIVE)
									.build()
									,Role.builder().
							name(Permission.ROLE_MEMBER)
							.build()))
					.build());


			for (int i=0 ; i<2 ; i++){
				memberRepository.save(Member.builder()
						.firstname("membre"+i)
						.lastName("member"+i)
								.password(bCryptPasswordEncoder.encode("user"))
								.username("user"+i)
								.email("email "+i+"@email.com")
						.roles(Set.of(Role.builder()
								.name(Permission.ROLE_MEMBER)
								.build()))
						.association(association)
						.build());
			}
		};
	}

}
