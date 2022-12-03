package com.projet;

import com.projet.entity.*;
import com.projet.repository.AssociationRepository;
import com.projet.repository.CategoryRepository;
import com.projet.repository.MemberRepository;
import com.projet.repository.OfferRepository;
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
							PasswordEncoder bCryptPasswordEncoder,
							CategoryRepository categoryRepository,
							OfferRepository offerRepository) {
		return args -> {
			Association association1 = associationRepository.save(Association.builder()
					.description("association1")
					.name("association1")
					.build());
			Association association2 = associationRepository.save(Association.builder()
					.description("association2")
					.name("association2")
					.build());
			Member representer1 = memberRepository.save(Member.builder()
					.association(association1)
							.email("admin@admin.com")
							.password(bCryptPasswordEncoder.encode("admin1"))
							.firstname("admin")
							.username("admin1")
							.roles(Set.of(Role.builder()
									.name(Permission.ROLE_REPRESENTATIVE)
									.build()
									,Role.builder().
							name(Permission.ROLE_MEMBER)
							.build()))
					.build());
			Member representer2 = memberRepository.save(Member.builder()
					.association(association2)
							.email("admin2@admin.com")
							.password(bCryptPasswordEncoder.encode("admin2"))
							.firstname("admin2")
							.username("admin2")
							.roles(Set.of(Role.builder()
									.name(Permission.ROLE_REPRESENTATIVE)
									.build()
									,Role.builder().
							name(Permission.ROLE_MEMBER)
							.build()))
					.build());
			Category cat1 = categoryRepository.save(Category.builder()
							.name("Menage")
							.description("Material de menage")
					.build());
			Category cat2 = categoryRepository.save(Category.builder()
							.name("Jardinage")
							.description("Material de menage")
					.build());
			Category cat3 = categoryRepository.save(Category.builder()
							.name("Construction")
							.description("Material de menage")
					.build());
			offerRepository.save(Offer.builder()
					.categories(Set.of(cat1, cat3))
							.association(association1)
					.title("offre de material 1")
					.description("description de material 1")
					.isArchived(false)
					.build());
			offerRepository.save(Offer.builder()
					.categories(Set.of(cat2, cat3))
					.association(association1)
					.title("offre de material 2")
					.description("description de material 2")
					.isArchived(false)
					.build());
			offerRepository.save(Offer.builder()
					.categories(Set.of(cat1, cat2))
					.association(association2)
					.title("offre de material 3")
					.description("description de material 3")
					.isArchived(false)
					.build());
			offerRepository.save(Offer.builder()
					.categories(Set.of(cat1))
					.association(association2)
					.title("offre de material 4")
					.description("description de material 4")
					.isArchived(false)
					.build());

			for (int i=0 ; i<2 ; i++){
				memberRepository.save(Member.builder()
						.firstname("member"+i)
						.lastName("member"+i)
								.password(bCryptPasswordEncoder.encode("member"))
								.username("member"+i)
								.email("member "+i+"@email.com")
						.roles(Set.of(Role.builder()
								.name(Permission.ROLE_MEMBER)
								.build()))
						.association(association1)
						.build());
			}
			for (int i=2 ; i<5 ; i++){
				memberRepository.save(Member.builder()
						.firstname("member"+i)
						.lastName("member"+i)
								.password(bCryptPasswordEncoder.encode("member"))
								.username("member"+i)
								.email("member "+i+"@email.com")
						.roles(Set.of(Role.builder()
								.name(Permission.ROLE_MEMBER)
								.build()))
						.association(association2)
						.build());
			}
		};
	}

}
