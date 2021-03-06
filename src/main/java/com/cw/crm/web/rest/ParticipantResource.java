package com.cw.crm.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cw.crm.security.SecurityUtils;
import com.cw.crm.service.ParticipantService;
import com.cw.crm.web.rest.errors.BadRequestAlertException;
import com.cw.crm.web.rest.util.HeaderUtil;
import com.cw.crm.web.rest.util.PaginationUtil;
import com.cw.crm.service.dto.ParticipantDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing Participant.
 */
@RestController
@RequestMapping("/api")
public class ParticipantResource {

    private final Logger log = LoggerFactory.getLogger(ParticipantResource.class);

    private static final String ENTITY_NAME = "participant";

    private final ParticipantService participantService;


    public ParticipantResource(ParticipantService participantService) { this.participantService = participantService; }

    /**
     * POST  /participants : Create a new participant.
     *
     * @param participantDTO the participantDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new participantDTO, or with status 400 (Bad Request) if the participant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/participants")
    @Timed
    public ResponseEntity<ParticipantDTO> createParticipant(@Valid @RequestBody ParticipantDTO participantDTO) throws URISyntaxException {
        log.debug("REST request to save Participant : {}", participantDTO);
        if (participantDTO.getId() != null) {
            throw new BadRequestAlertException("A new participant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParticipantDTO result = participantService.save(participantDTO);
        return ResponseEntity.created(new URI("/api/participants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /participants : Updates an existing participant.
     *
     * @param participantDTO the participantDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated participantDTO,
     * or with status 400 (Bad Request) if the participantDTO is not valid,
     * or with status 500 (Internal Server Error) if the participantDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/participants")
    @Timed
    public ResponseEntity<ParticipantDTO> updateParticipant(@Valid @RequestBody ParticipantDTO participantDTO) throws URISyntaxException {
        log.debug("REST request to update Participant : {}", participantDTO);
        if (participantDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ParticipantDTO result = participantService.save(participantDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, participantDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /participants : get all the participants.
     *
     *
     * @return the ResponseEntity with status 200 (OK) and the list of participants in body
     */
    @GetMapping("/participants")
    @Timed
    public List<ParticipantDTO>  getAllParticipants() {
        /* log.debug("REST request to get a page of Participants");
        List<ParticipantDTO> list = participantService.findAll();
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/participants");
        return ResponseEntity.ok().headers(headers).body(page.getContent());*/
        log.debug("REST request to get all Participants");
        return participantService.findAll();
    }

    /**
     * GET  /participants/:id : get the "id" participant.
     *
     * @param id the id of the participantDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the participantDTO, or with status 404 (Not Found)
     */
    @GetMapping("/participants/{id}")
    @Timed
    public ResponseEntity<ParticipantDTO> getParticipant(@PathVariable Long id) {
        log.debug("REST request to get Participant : {}", id);
        Optional<ParticipantDTO> participantDTO = participantService.findOne(id);
        return ResponseUtil.wrapOrNotFound(participantDTO);
    }

    /**
     * DELETE  /participants/:id : delete the "id" participant.
     *
     * @param id the id of the participantDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/participants/{id}")
    @Timed
    public ResponseEntity<Void> deleteParticipant(@PathVariable Long id) {
        log.debug("REST request to delete Participant : {}", id);
        participantService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * CASELOAD  /participants-caseload/ : run the Caseload report
     * Caseload report is jsut an exportable participant list
     *
     * @return the ResponseEntity with status 200 (OK) and the list of participants in body
     */
    @GetMapping("/participants-caseload/")
    @Timed
    public List<ParticipantDTO>  caseload() {
        log.debug("REST request to get caseload report");
        return participantService.caseloadReport();
    }

    /**
     * AUTHORIZATION  /participants-authorization/ : run the authorization report
     * Authorization report shows participants that recieved an authorization number and the date
     * they became authorized
     *
     * @return the ResponseEntity with status 200 (OK) and the list of participants in body
     */
    @GetMapping("/participants-authorization/")
    @Timed
    public List<ParticipantDTO>  authorization() {
        log.debug("REST request to get caseload report");
        return participantService.authorizationReport();
    }
}
