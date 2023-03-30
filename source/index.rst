.. GitHub Actions Demo documentation master file, created by
   sphinx-quickstart on Wed Mar 29 11:11:09 2023.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

========================
GitHub Actions Demo
========================

TL;DR
======

GitHub Actions is a set of convenient features to help users run shell commands on a fresh VM for CICD.

.. tip:: If we use these features well, we can reduce both cost and CICD processing time, and improve developers'
   experience.

Overview
=========

GitHub Actions is a CI/CD platform. It runs users' *workflows* defined by declarative YAML files in the
:file:`.github/workflows` folder of a GitHub repo.

On a high-level:

* Each GitHub repo has one or more *workflows*.

* Each workflow is made up of one or more *jobs*, by default running concurrently in separate virtual machines.

* Each job consists of one or more *steps*, by default running sequentially but each in its own process.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   workflow
   job
   steps
