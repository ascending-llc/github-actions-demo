Job
======

By default, each job is placed in a separate *ephemeral* GitHub hosted runner and runs in parallel with other jobs
in the same workflow. The runner is a new virtual machine with a rich set of pre-installed tools. It is torn down
after the job finishes. Dependent relationships between jobs can be set up, but they still run in separate runners.

.. warning:: The build artifacts from a previous job are NOT readily available to the subsequent jobs that depend
   on it. Must use `actions/upload-artifact <https://github.com/actions/upload-artifact>`_ and
   `actions/download-artifact <https://github.com/actions/download-artifact>`_ to pass them around.

.. tip:: Advantages of using fresh VMs:

   * Virtual machine provides better isolation between different users' workloads. Tearing down the VM afterwards makes
     it even more secure.

   * Great support for deploying resources in AWS --- Use an AWS provided CloudFormation template to create an
     ``AWS::IAM::OIDCProvider`` resource in user's AWS account. A runner can thereby authenticate itself to the
     ``OIDCProvider`` as the GitHub repo that triggers the workflow. This allows the runner to assume an IAM role
     used for deployment without using credentials. In addition, all assuming activities of the role are logged
     in CloudTrail.
