package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.exception.BadRequestException;
import com.hust.musicapp.musicapp.model.AuthProvider;
import com.hust.musicapp.musicapp.model.Role;
import com.hust.musicapp.musicapp.model.User;
import com.hust.musicapp.musicapp.payload.ApiResponse;
import com.hust.musicapp.musicapp.payload.AuthResponse;
import com.hust.musicapp.musicapp.payload.LoginRequest;
import com.hust.musicapp.musicapp.payload.SignUpRequest;
import com.hust.musicapp.musicapp.repository.RoleRepo;
import com.hust.musicapp.musicapp.repository.UserRepository;
import com.hust.musicapp.musicapp.security.TokenProvider;
import jdk.nashorn.internal.runtime.options.Option;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private RoleRepo roleRepo;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Optional<User> existedUser=userRepository.findByEmail(loginRequest.getEmail());
       Optional<Role> role= existedUser.get().getRoles().stream().filter(r->r.getRoleName().equalsIgnoreCase("ROLE_ADMIN")).findFirst();
       Authentication authentication=null;
        List<GrantedAuthority> grantedAuths=null;
       if(role.isPresent()){
           grantedAuths =
           AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_ADMIN");
           authentication = authenticationManager.authenticate(
                   new UsernamePasswordAuthenticationToken(
                           loginRequest.getEmail(),
                           loginRequest.getPassword(),grantedAuths
                   ));
       }else{
           grantedAuths =
                   AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");
           authentication = authenticationManager.authenticate(
                   new UsernamePasswordAuthenticationToken(
                           loginRequest.getEmail(),
                           loginRequest.getPassword(),grantedAuths
                   ));
       }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }

        // Creating user's account
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.getRoles().add(roleRepo.findById(1L).get());
        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully@"));
    }

}
